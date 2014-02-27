RBV.Renderer.VizModule = RBV.Renderer.VizModule || {};

/**
 * @class This terrain builds up a LOD with 3 levels of the received data.
 * @param root - Dom Element to append the terrain to.
 * @param data - Received Data of the Server request.
 * @param index - Index of the model that uses this terrain.
 * @param noDataValue - Array with the RGB values to be considered as no data available and shall be drawn transparent.
 * @param noDemValue - The single value in the DEM that should be considered as NODATA
 * @augments EarthServerGenericClient.AbstractTerrain
 * @constructor
 */
// root, data, index, noDataValue, noDemValue
RBV.Renderer.VizModule.LODTerrainWithOverlays = function(opts) {
    this.data = opts.demResponse;
    this.index = opts.index;
    this.noData = opts.noDataValue;
    this.noDemValue = opts.noDemValue;
    this.root = opts.root;
    this.name = opts.id + this.index;

    this.textureDescs = this.extractTextureDescFromResponses(opts.textureResponses);

    /**
     * Distance to change between full and 1/2 resolution.
     * @type {number}
     */
    var lodRange1 = 5000;
    /**
     * Distance to change between 1/2 and 1/4 resolution.
     * @type {number}
     */
    var lodRange2 = 17000;

    /**
     * Size of one chunk. Chunks at the borders can be smaller.
     * We want to build 3 chunks for the LOD with different resolution but the same size on the screen.
     * With 121 values the length of the most detailed chunk is 120.
     * The second chunk has 61 values and the length of 60. With a scale of 2 it's back to the size of 120.
     * The third chunk has 31 values and the length if 30. With a scale of 4 it's also back to the size 120.
     * @type {number}
     */
    var chunkSize = 121;
    /**
     * General information about the number of chunks needed to build the terrain.
     * @type {number}
     */
    var chunkInfo = this.calcNumberOfChunks(this.data.width, this.data.height, chunkSize);

    /**
     * Counter for the insertion of chunks.
     * @type {number}
     */
    var currentChunk = 0;

    /**
     * Builds the terrain and appends it into the scene.
     */
    this.createTerrain = function() {
        for (currentChunk = 0; currentChunk < chunkInfo.numChunks; currentChunk++) {
            EarthServerGenericClient.MainScene.enterCallbackForNextFrame(this.index);
        }
        currentChunk = 0;

        if (!this.textureBlendEffect) {

            this.textureBlendEffect = new RBV.Renderer.Effects.TextureBlend({
                id: this.name,
                transparency: this.data.transparency,
                material: {
                    specular: this.data.specularColor,
                    diffuse: this.data.diffuseColor,
                    transparency: this.data.transparency
                },
                upright: false
            });

            for (var idx = 0; idx < this.textureDescs.length; idx++) {
                var desc = this.textureDescs[idx];
                this.textureBlendEffect.addTextureFromDesc(desc);
            };
            this.textureBlendEffect.commitChanges();
        }

        EarthServerGenericClient.MainScene.reportProgress(this.index);
    };

    /**
     * The Scene Manager calls this function after a few frames since the last insertion of a chunk.
     */
    this.nextFrame = function() {
        //Build all necessary information and values to create a chunk
        var info = this.createChunkInfo(this.index, chunkSize, chunkInfo, currentChunk, this.data.width, this.data.height);
        var hm = this.getHeightMap(info);

        var transform = document.createElement('Transform');
        transform.setAttribute('translation', info.xpos + ' 0 ' + info.ypos);
        transform.setAttribute('scale', '1.0 1.0 1.0');

        var lodNode = document.createElement('LOD');
        lodNode.setAttribute('Range', lodRange1 + ',' + lodRange2);
        lodNode.setAttribute('id', 'lod' + info.ID);

        var appearances = [this.textureBlendEffect.appearance().el];
        if (this.noDataValue !== undefined || this.noDemValue != undefined) {
            new GapGrid(lodNode, info, hm, appearances, this.noDemValue);
        } else {
            new ElevationGrid(lodNode, info, hm, appearances);
        }

        transform.appendChild(lodNode);
        this.root.appendChild(transform);

        currentChunk++;
    };
};
RBV.Renderer.VizModule.LODTerrainWithOverlays.inheritsFrom(EarthServerGenericClient.AbstractTerrain);

RBV.Renderer.VizModule.LODTerrainWithOverlays.prototype.reset = function() {
    EarthServerGenericClient.MainScene.removeModelCallbacks(this.index);
};

RBV.Renderer.VizModule.LODTerrainWithOverlays.prototype.addOverlays = function(serverResponses) {
    this.textureDescs = this.textureDescs.concat(this.extractTextureDescFromResponses(serverResponses));
    this.updateEffect();
};

RBV.Renderer.VizModule.LODTerrainWithOverlays.prototype.removeOverlayById = function(id) {
    var textureDescription = _.find(this.textureDescs, function(desc) {
        return desc.id === id;
    });

    if (!textureDescription) {
        return;
    }

    this.textureDescs = _.without(this.textureDescs, textureDescription);

    this.updateEffect();
};

RBV.Renderer.VizModule.LODTerrainWithOverlays.prototype.updateEffect = function() {
    // NOTE: When adding an overlay the best way is to completely reset the blend effect
    // and add _all_ textures again. This has the advantage that opacity changes of existing
    // overlays are incorporated. Otherwise the update in the underlying shader code causes
    // existing layers to be reset to their initial opacity.
    // The opacity tracking mechanism for existing overlays is implemented in the
    // 'setTransparencyFor' function.
    this.textureBlendEffect.reset();
    for (var idx = 0; idx < this.textureDescs.length; idx++) {
        var desc = this.textureDescs[idx];
        this.textureBlendEffect.addTextureFromDesc(desc);
    };
    this.textureBlendEffect.commitChanges();
};

/**
 * Overwrites function from base terrain class. Sets the transparency in the shader.
 * @param value - Transparency value between 0 (full visible) and 1 (invisible).
 */
RBV.Renderer.VizModule.LODTerrainWithOverlays.prototype.setTransparencyFor = function(texture_id, value) {
    var transparencyFieldId = this.name + '_transparency_for_' + texture_id;
    var transparencyFN = document.getElementById(transparencyFieldId);

    if (transparencyFN) {
        transparencyFN.setAttribute('value', String(1.0 - value));
        var textureDesc = _.find(this.textureDescs, function(desc) {
            return desc.id === texture_id;
        });
        if (textureDesc) {
            textureDesc.opacity = 1.0 - value;
        } else {
            console.error('[LODTerrainWithOverlays::setTransparencyFor] cannot find textureResponse "' + texture_id + '". This should not happen!');
        }
    } else {
        console.log('RBV.Renderer.VizModule.LODTerrainWithOverlays: Cannot find transparency field: ' + transparencyFieldId);
    }
};

RBV.Renderer.VizModule.LODTerrainWithOverlays.prototype.extractTextureDescFromResponses = function(responses) {
    var texture_descriptions = [];
    for (var idx = 0; idx < responses.length; idx++) {
        var textureData = responses[idx].texture;
        var textureEl = this.createCanvas(textureData, this.index, this.noDataValue, false);

        texture_descriptions.push({
            id: responses[idx].layerInfo.id,
            opacity: responses[idx].layerInfo.opacity,
            textureEl: textureEl
        });
    };

    return texture_descriptions;
};