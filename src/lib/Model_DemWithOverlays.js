RBV.Models = RBV.Models || {};

"use strict";

/**
 * @class Scene Model: WMS Image with DEM from WCS Query
 * 2 URLs for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
RBV.Models.DemWithOverlays = function() {
    this.setDefaults();
    this.name = "DEM with overlay(s)";

    this.terrain = null;
    this.demRequest = null;
    this.imageryProviders = [];

    this.isResetted = true;
};
RBV.Models.DemWithOverlays.inheritsFrom(EarthServerGenericClient.AbstractSceneModel);


RBV.Models.DemWithOverlays.prototype.reset = function() {
    this.demRequest = null;
    this.imageryProviders = [];

    if (this.terrain) {
        this.terrain.reset(); // removes pending callbacks in the EarthServerGenericClient runtime
        this.terrain = null;
    }


    // FIXXME: this removes ALL models, which is not what we want...
    EarthServerGenericClient.MainScene.resetScene();
    this.setDefaults();
    this.isResetted = true;
}

/**
 * Sets the DEM request.
 * @param request - Configured Request object
 * @see Request
 */
RBV.Models.DemWithOverlays.prototype.setDemProvider = function(provider) {
    this.demRequest = provider;
};

/**
 * Adds an imagery request.
 * @param request - Configured Request object
 * @see Request
 */
RBV.Models.DemWithOverlays.prototype.addImageryProvider = function(provider) {
    this.imageryProviders.push(provider);

    // Connect to transparency change events:
    provider.on('change:opacity', function(layer, value) {
        this.terrain.setTransparencyFor(layer.get('id'), (1 - value));
    }.bind(this));

    if (this.terrain) {
        this.requestData();
    }
};

/**
 * Removes an imagery request.
 * @param provider - The provider to be removed
 */
RBV.Models.DemWithOverlays.prototype.removeImageryProviderById = function(id) {
    var provider = _.find(this.imageryProviders, function(item) {
        return id === item.get('id');
    });

    if (provider) {
        provider.off('change:opacity');
        var idx = _.indexOf(this.imageryProviders, provider);
        this.imageryProviders.splice(idx, 1);
    } else {
        console.error('[RBV.Models.DemWithOverlays::removeImageryProviderById] Layer "' + id + '" not found!');
    }

    if (this.terrain) {
        this.terrain.removeOverlayById(id);
    }
};

/**
 * Sets the timespan for the request
 * @param timespan - eg. '2013-06-05T00:00:00Z/2013-06-08T00:00:00Z'
 */
RBV.Models.DemWithOverlays.prototype.setTimespan = function(timespan) {
    this.timespan = timespan;
};

RBV.Models.DemWithOverlays.prototype.update = function(hasNewData) {
    // No update is needed, as the terrain is not created yet. The pending updates
    // will be implicitly applied when creating the terrain in 'createModel'.
    if (!this.terrain) {
        return;
    }

    if (hasNewData) {
        this.requestData();
    } else { // If a layer was removed simply update the shader:
        this.updateShader();
    }
}

RBV.Models.DemWithOverlays.prototype.setTransparencyFor = function(id, value) {
    // Find corresponding layer:
    var layer = _.find(this.imageryProviders, function(layer) {
        return layer.get('id') === id;
    });

    if (layer) {
        // FIXXME: the attribute is set here, its change event triggers the function registered
        // in 'addImageryProvider'. Are there any advantages in calling terrain.setTransparencyFor()
        // here directly?
        layer.set('opacity', value);
    }
};
/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
RBV.Models.DemWithOverlays.prototype.createModel = function(root, cubeSizeX, cubeSizeY, cubeSizeZ) {
    this.isResetted = false;

    if (typeof root === 'undefined') {
        throw Error('[Model_DEMWithOverlays::createModel] root is not defined')
    }

    EarthServerGenericClient.MainScene.timeLogStart("Create Model_DEMWithOverlays " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.bbox = {
        minLongitude: this.miny,
        maxLongitude: this.maxy,
        minLatitude: this.minx,
        maxLatitude: this.maxx
    };

    this.root = root;

    this.createPlaceHolder();
    this.requestData();
};

/**
 * Requests data based on the available layers and calls 'receiveData' afterwards with the ServerResponses.
 * The internal logic only requests data that has to be updated.
 */
RBV.Models.DemWithOverlays.prototype.requestData = function() {
    // First find out which data has to be requested:

    // Convert the original Backbone.Model layers to 'plain-old-data' javascript objects:
    var layerRequests = [];
    _.each(this.imageryProviders, function(layer, idx) {
        if (!layer.get('isUpToDate')) {
            layer.set('isUpToDate', true);
            layerRequests.push(layer.toJSON());
        }
    });

    if (!this.demRequest.get('isUpToDate')) {
        this.demRequest.set('isUpToDate', true);
        layerRequests.push(this.demRequest.toJSON());
    };

    if (layerRequests.length) {
        EarthServerGenericClient.sendRequests(this, layerRequests, {
            bbox: this.bbox,
            timespan: this.timespan,
            resX: this.XResolution,
            resZ: this.ZResolution
        });
    }
};

RBV.Models.DemWithOverlays.prototype.receiveData = function(serverResponses) {
    // In case the model was resetted after a request was send which did not resolve yet,
    // the incoming request is skipped here:
    if (this.isResetted) {
        return;
    }

    if (this.checkReceivedData(serverResponses)) {
        var initialSetup = false;
        if (!this.terrain) {
            initialSetup = true;
        }

        var serverResponses = _.sortBy(serverResponses, function(response) {
            return response.layerInfo.ordinal
        });

        if (initialSetup) {
            // Setup and create the initial terrain:
            this.removePlaceHolder();

            // Distinguish between 'imagery' and 'dem' ServerResponses in the serverResponses
            // FIXXME: This is clumsy...
            var demResponse = null;
            var textureResponses = [];
            var lastidx = -1;
            for (var idx = 0; idx < serverResponses.length; ++idx) {
                var response = serverResponses[idx];
                if (response.heightmap) {
                    demResponse = response;
                } else {
                    textureResponses.push(response);
                    // console.log('[RBV.Models.DemWithOverlays::receiveData] received layer: ' + response.layerInfo.id+ ' / ordinal: ' + response.layerInfo.ordinal);
                }
            }


            var YResolution = this.YResolution || (parseFloat(demResponse.maxHMvalue) - parseFloat(demResponse.minHMvalue));
            var transform = this.createTransform(demResponse.width, YResolution, demResponse.height, parseFloat(demResponse.minHMvalue), demResponse.minXvalue, demResponse.minZvalue);
            this.root.appendChild(transform);

            //Create Terrain out of the received demResponse
            EarthServerGenericClient.MainScene.timeLogStart("Update Terrain " + this.name);
            this.terrain = new RBV.Visualization.LODTerrainWithOverlays({
                root: transform,
                demResponse: demResponse,
                textureResponses: textureResponses,
                index: this.index,
                noDataValue: this.noData,
                demNoDataValue: this.demNoData,
                name: this.name
            });

            this.terrain.createTerrain();
            EarthServerGenericClient.MainScene.timeLogEnd("Update Terrain " + this.name);
            this.elevationUpdateBinding();
            if (this.sidePanels) {
                this.terrain.createSidePanels(this.transformNode, 1);
            }
            EarthServerGenericClient.MainScene.timeLogEnd("Create Model_DEMWithOverlays " + this.name);

            transform = null;
        } else {
            this.terrain.addOverlays(serverResponses);
        }
    }
};

/**
 * Validates the received data from the server request.
 */
RBV.Models.DemWithOverlays.prototype.checkReceivedData = function(serverResponses) {
    for (var idx = 0; idx < serverResponses.length; ++idx) {
        var data = serverResponses[idx];
        this.receivedDataCount++;
        this.reportProgress();

        // No texture whished?
        if (this.colorOnly && data !== null && data !== undefined) {
            data.validateTexture = false; // disable check for texture
            data.texture = undefined;
        }

        // if (data === null || !data.validate()) {
        //     alert(this.name + ": Request not successful.");
        //     console.log(data);
        //     this.reportProgress(); //NO Terrain will be built so report the progress here
        //     this.removePlaceHolder(); //Remove the placeHolder.

        //     //delete UI elements
        //     var header = document.getElementById("EarthServerGenericClient_ModelHeader_" + this.index);
        //     var div = document.getElementById("EarthServerGenericClient_ModelDiv_" + this.index);

        //     if (header && div) {
        //         var parent = div.parentNode;

        //         if (parent) {
        //             parent.removeChild(div);
        //             parent.removeChild(header);
        //         }
        //     }
        //     return false;
        // }

        // add module specific values
        data.transparency = this.transparency;
        data.specularColor = this.specularColor || EarthServerGenericClient.MainScene.getDefaultSpecularColor();
        data.diffuseColor = this.diffuseColor || EarthServerGenericClient.MainScene.getDefaultDiffuseColor();
    }

    return true;
};

/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
RBV.Models.DemWithOverlays.prototype.setSpecificElement = function(element) {
    EarthServerGenericClient.appendElevationSlider(element, this.index);
};