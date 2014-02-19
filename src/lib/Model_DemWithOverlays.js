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
};
RBV.Models.DemWithOverlays.inheritsFrom(EarthServerGenericClient.AbstractSceneModel);

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

    // this.listenTo(provider, 'opacity:change', function(model, value) {
    //     console.log('Provider "' + model.id + '" changed opacity to "' + value + '"');
    // });
};

/**
 * Sets the timespan for the request
 * @param timespan - eg. '2013-06-05T00:00:00Z/2013-06-08T00:00:00Z'
 */
RBV.Models.DemWithOverlays.prototype.setTimespan = function(timespan) {
    this.timespan = timespan;
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
RBV.Models.DemWithOverlays.prototype.createModel = function(root, cubeSizeX, cubeSizeY, cubeSizeZ) {
    if (typeof root === 'undefined') {
        throw Error('[Model_DEMWithOverlays::createModel] root is not defined')
    }

    EarthServerGenericClient.MainScene.timeLogStart("Create Model_DEMWithOverlays " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    var bbox = {
        minLongitude: this.miny,
        maxLongitude: this.maxy,
        minLatitude: this.minx,
        maxLatitude: this.maxx
    };

    this.root = root;
    this.createPlaceHolder();

    // Convert the original Backbone.Model layers to 'plain-old-data' javascript objects:
    var podImageryProviders = [];
    _.each(this.imageryProviders, function(layer, idx) {
        podImageryProviders.push(layer.toJSON());
    });

    var podDemProvider = this.demRequest.toJSON();
    
    EarthServerGenericClient.getDEMWithOverlays(this, {
        dem: podDemProvider,
        imagery: podImageryProviders,
        bbox: bbox,
        timespan: this.timespan,
        resX: this.XResolution,
        resZ: this.ZResolution
    });
};

RBV.Models.DemWithOverlays.prototype.receiveData = function(serverResponses) {
    if (this.checkReceivedData(serverResponses)) {
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
            }
        }

        var YResolution = this.YResolution || (parseFloat(demResponse.maxHMvalue) - parseFloat(demResponse.minHMvalue));
        var transform = this.createTransform(demResponse.width, YResolution, demResponse.height, parseFloat(demResponse.minHMvalue), demResponse.minXvalue, demResponse.minZvalue);
        this.root.appendChild(transform);

        //Create Terrain out of the received demResponse
        EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
        // transform, demResponse, this.index, this.noData, this.demNoData);
        this.terrain = new RBV.Visualization.LODTerrainWithOverlays({
            root: transform,
            demResponse: demResponse,
            textureResponses: textureResponses,
            index: this.index,
            noDataValue: this.noData,
            demNoDataValue: this.demNoData
        });

        this.terrain.getAppearances = this.getAppearances;
        this.terrain.setTransparency = this.setTransparency;
        this.terrain.createTerrain();
        EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);
        this.elevationUpdateBinding();
        if (this.sidePanels) {
            this.terrain.createSidePanels(this.transformNode, 1);
        }
        EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);

        transform = null;
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