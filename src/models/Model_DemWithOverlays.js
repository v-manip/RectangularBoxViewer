RBV.Models = RBV.Models || {};

"use strict";

/**
 * @class Scene Model: WMS Image with DEM from WCS Query
 * 2 URLs for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
RBV.Models.DemWithOverlays = function() {
    this.setDefaults();
    this.id = "LODTerrainWithOverlays";
    this.isReset = true;

    this.context = null;
    this.terrainLayer = null;
    this.imageryLayers = [];

    this.terrain = null;
};
RBV.Models.DemWithOverlays.inheritsFrom(EarthServerGenericClient.AbstractSceneModel);

RBV.Models.DemWithOverlays.prototype.supportsLayer = function(model) {
    if (model.get('view').isBaseLayer) {
        console.log('SKIPPING REQUEST!!!');
        return false;
        var views = model.get('views');
        var isSupported = false;
        for (var idx = 0; idx < views.length; idx++) {
            var view = views[idx];
            if (view.protocol.toUpperCase() === 'WMS') {
                isSupported = true;
                break;
            }
        };
        return isSupported;
    } else {
        return (model.get('view').protocol.toUpperCase() === 'WMS') ? true : false;
    }
}

RBV.Models.DemWithOverlays.prototype.applyContext = function(context) {
    this.reset();

    this.context = context;

    var terrainLayers = this.context.getLayersByType('terrain');
    if (!terrainLayers.length) {
        throw "[RBV.Models.DemWithOverlays] Context has no 'terrain' layer. Aborting!";
    }
    // Take the first available terrain layer:
    this.terrainLayer = terrainLayers[0];
    this.imageryLayers = this.context.getSelectedLayersByType('imagery', this.supportsLayer);

    //Register to context relevant changes: 
    _.forEach(this.imageryLayers, function(layer) {
        layer.on('change:opacity', this.onOpacityChange, this);
    }.bind(this));

    // TODO: Listening on all layers is also possible, but not so efficient, I guess:
    // this.context.on('change:layer:opacity', function(layer, opacity) {
    //     console.log('visibility: ' + layer.get('id'));
    //     console.log('visibility: ' + opacity);
    // });

    this.context.on('change:layer:visibility', function(layer, visibility) {
        this.addImageLayer(layer);
    }.bind(this));
}

RBV.Models.DemWithOverlays.prototype.reset = function() {
    // Remove context change handler:
    _.forEach(this.imageryLayers, function(layer) {
        layer.off('change:opacity', this.onOpacityChange);
        layer.set('isUpToDate', false);
    }.bind(this));

    if (this.terrainLayer) {
        this.terrainLayer.set('isUpToDate', false);
    }
    this.terrainLayer = null;
    this.imageryLayers = [];

    if (this.terrain) {
        this.terrain.reset(); // removes pending callbacks in the EarthServerGenericClient runtime
        this.terrain = null;
    }

    // FIXXME: this removes ALL models, which is not what we want...
    // FIXXME: resetScene() internally also does a cleanup for this.terrain. Take this into account!
    EarthServerGenericClient.MainScene.resetScene();
    this.setDefaults();
    this.isReset = true;
}

RBV.Models.DemWithOverlays.prototype.onOpacityChange = function(layer, value) {
    this.terrain.setTransparencyFor(layer.get('id'), (1 - value));
};

/**
 * Sets the terrain layer.
 * @param layer - VMANIP.Layer object
 * @see Layer
 */
RBV.Models.DemWithOverlays.prototype.addTerrainLayer = function(layer) {
    this.terrainLayer = layer;
};

/**
 * Adds an imagery request.
 * @param request - Configured Layer object
 * @see Layer
 */
RBV.Models.DemWithOverlays.prototype.addImageLayer = function(layer) {
    this.imageryLayers.push(layer);

    // Connect to transparency change events:
    layer.on('change:opacity', function(layer, value) {
        this.terrain.setTransparencyFor(layer.get('id'), (1 - value));
    }.bind(this));

    if (this.terrain) {
        this.requestData();
    }
};

RBV.Models.DemWithOverlays.prototype.removeImageLayerById = function(id) {
    var layer = _.find(this.imageryLayers, function(item) {
        return id === item.get('id');
    });

    if (layer) {
        layer.off('change:opacity', this.onOpacityChange);
        var idx = _.indexOf(this.imageryLayers, layer);
        this.imageryLayers.splice(idx, 1);
    } else {
        console.error('[RBV.Models.DemWithOverlays::removeImageLayerById] Layer "' + id + '" not found!');
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

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
RBV.Models.DemWithOverlays.prototype.createModel = function(root, cubeSizeX, cubeSizeY, cubeSizeZ) {
    this.isReset = false;

    if (typeof root === 'undefined') {
        throw Error('[Model_DEMWithOverlays::createModel] root is not defined')
    }

    EarthServerGenericClient.MainScene.timeLogStart("Create Model_DEMWithOverlays " + this.id);

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
 * Layers data based on the available layers and calls 'receiveData' afterwards with the ServerResponses.
 * The internal logic only requests data that has to be updated.
 */
RBV.Models.DemWithOverlays.prototype.requestData = function() {
    // First find out which data has to be requested:

    // Convert the original Backbone.Model layers to 'plain-old-data' javascript objects:
    var layerRequests = [];
    _.each(this.imageryLayers, function(layer, idx) {
        if (!layer.get('isUpToDate')) {
            layer.set('isUpToDate', true);
            layerRequests.push(layer.toJSON());
        }
    });

    if (!this.terrainLayer.get('isUpToDate')) {
        this.terrainLayer.set('isUpToDate', true);
        layerRequests.push(this.terrainLayer.toJSON());
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
    if (this.isReset) {
        return;
    }

    if (this.checkReceivedData(serverResponses)) {
        var initialSetup = false;
        if (!this.terrain) {
            initialSetup = true;
        }

        if (initialSetup) {
            this.removePlaceHolder();

            EarthServerGenericClient.MainScene.timeLogStart("Update Terrain " + this.id);

            // FIXXME: I want to get rid of the ServerResponse object and replace it with a VMANIP.Layer.
            // The Layer is the natural place to request data and store it in an appropriate way.
            // Currently there is mixture of VMANIP.Layers and EarthServer.ServerResponses, where also
            // my naming is not consistent everywhere. Keep that in mind if you struggle with the types,
            // but things will improve soon ;-)
            var layers = this.createLayersFromServerResponses(serverResponses);

            var transform = this.createTransformInScene(layers.terrain);
            this.root.appendChild(transform);

            this.terrain = new RBV.Renderer.Components.LODTerrainWithOverlays({
                id: this.id,
                root: transform,
                terrainLayer: layers.terrain,
                imageryLayers: layers.images,
                index: this.index,
                noDataValue: this.noData,
                demNoDataValue: this.demNoData,
            });
            this.terrain.createTerrain();

            EarthServerGenericClient.MainScene.timeLogEnd("Update Terrain " + this.id);

            // this.elevationUpdateBinding();
            // if (this.sidePanels) {
            //     this.terrain.createSidePanels(this.transformNode, 1);
            // }
            // EarthServerGenericClient.MainScene.timeLogEnd("Create Model_DEMWithOverlays " + this.id);
        } else {
            this.terrain.addOverlays(serverResponses);
        }
    }
};

RBV.Models.DemWithOverlays.prototype.createLayersFromServerResponses = function(serverResponses) {
    // Distinguish between 'imagery' and 'dem' ServerResponses in the serverResponses
    // FIXXME: This is clumsy...
    var terrainLayer = null;
    var imageryLayers = [];
    var lastidx = -1;
    for (var idx = 0; idx < serverResponses.length; ++idx) {
        var response = serverResponses[idx];
        if (response.heightmap) {
            terrainLayer = response;
        } else {
            imageryLayers.push(response);
            // console.log('[RBV.Models.DemWithOverlays::receiveData] received layer: ' + response.layerInfo.id+ ' / ordinal: ' + response.layerInfo.ordinal);
        }
    }

    return {
        terrain: terrainLayer,
        images: imageryLayers
    };
}

RBV.Models.DemWithOverlays.prototype.createTransformInScene = function(terrainLayer) {
    var YResolution = this.YResolution || (parseFloat(terrainLayer.maxHMvalue) - parseFloat(terrainLayer.minHMvalue));
    var boxTransform = this.createTransform(terrainLayer.width, YResolution, terrainLayer.height, parseFloat(terrainLayer.minHMvalue), terrainLayer.minXvalue, terrainLayer.minZvalue);

    return boxTransform;
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
        //     alert(this.id + ": Layer not successful.");
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