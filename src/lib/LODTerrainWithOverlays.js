RBV.Visualization = RBV.Visualization || {};

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
RBV.Visualization.LODTerrainWithOverlays = function(opts) {
    this.data = opts.demResponse;
    this.textureResponses = opts.textureResponses;
    this.index = opts.index;
    this.noData = opts.noDataValue;
    this.noDemValue = opts.noDemValue;
    this.root = opts.root;
    this.name = opts.name;

    this.transparencysFN = {};
    this.appearancesN = {};

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
        //chunkInfo = null;

        EarthServerGenericClient.MainScene.reportProgress(this.index);
    };

    this.createTextureDescriptionsFromServerResponses = function(responses) {
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

    /**
     * The Scene Manager calls this function after a few frames since the last insertion of a chunk.
     */
    this.nextFrame = function() {
        //Build all necessary information and values to create a chunk
        var info = this.createChunkInfo(this.index, chunkSize, chunkInfo, currentChunk, this.data.width, this.data.height);
        var hm = this.getHeightMap(info);

        var texture_descriptions = this.createTextureDescriptionsFromServerResponses(this.textureResponses);

        var appearances = this.createAppearances({
            name: 'TerrainApp_' + this.index,
            lodCounts: 3,
            modelIndex: this.index,
            texture_descriptions: texture_descriptions,
            transparency: this.data.transparency,
            specularColor: this.data.specularColor,
            diffuseColor: this.data.diffuseColor,
            upright: false
        });

        var transform = document.createElement('Transform');
        transform.setAttribute('translation', info.xpos + ' 0 ' + info.ypos);
        transform.setAttribute('scale', '1.0 1.0 1.0');

        var lodNode = document.createElement('LOD');
        lodNode.setAttribute('Range', lodRange1 + ',' + lodRange2);
        lodNode.setAttribute('id', 'lod' + info.ID);

        if (this.noDataValue !== undefined || this.noDemValue != undefined) {
            new GapGrid(lodNode, info, hm, appearances, this.noDemValue);
        } else {
            new ElevationGrid(lodNode, info, hm, appearances);
        }

        transform.appendChild(lodNode);
        this.root.appendChild(transform);

        currentChunk++;

        // FIXXME: circular references?
        // //Delete vars avoid circular references
        // info = null;
        // hm = null;
        // appearance = null;
        // transform = null;
        // lodNode = null;
    };

    this.addOverlays = function(provider_array) {
        this.textureResponses = this.textureResponses.concat(provider_array);
        var texture_descriptions = this.createTextureDescriptionsFromServerResponses(this.textureResponses);

        this.multiTextureN = this.createMultiTextureN(texture_descriptions, opts.name);
        var fragShader = this.createFragmentShaderCode(texture_descriptions, this.name);
        this.fragmentShader = fragShader;
    };

    this.updateShader = function(texture_descriptions) {
        console.log('update shader - NIY');
    };

    this.createShaderN = function(texture_descriptions, namespace) {
        // <ComposedShader DEF='ComposedShader'>
        //           <field name='tex_a' type='SFInt32' value='0'/>
        //           <field name='tex_b' type='SFInt32' value='1'/>
        //           <field name='tex_c' type='SFInt32' value='2'/> 

        //         <ShaderPart type='FRAGMENT'>
        //                 #ifdef GL_ES
        //                   precision highp float;
        //                 #endif

        //                 uniform sampler2D tex_a;
        //                 uniform samplerCube tex_b;
        //                 uniform sampler2D tex_c;
        //                 ...
        //         </ShaderPart>
        //         ...
        // </ConposedShader>

        // TODO: read static parts of the shader from the DOM and insert only dynamic parts here:
        // Rough idea:
        // var myshader = document.getElementById('myshader');
        // var shader = $('#myshader').clone().attr('id', AppearanceName + '_mat');

        var shaderN = document.createElement('ComposedShader');

        var tex_idx = 0;
        for (var idx = 0; idx < texture_descriptions.length; idx++) {
            var desc = texture_descriptions[idx];

            var transparencyFN = document.createElement('field');
            transparencyFN.setAttribute('id', namespace + '_transparency_for_' + desc.id);
            transparencyFN.setAttribute('name', 'transparency_' + desc.id);
            transparencyFN.setAttribute('type', 'SFFloat');
            transparencyFN.setAttribute('value', '1');
            shaderN.appendChild(transparencyFN);

            this.transparencysFN[namespace + '_transparency_for_' + desc.id] = transparencyFN;

            var textureIdFN = document.createElement('field');
            textureIdFN.setAttribute('id', namespace + '_texture_for_' + desc.id);
            textureIdFN.setAttribute('name', 'tex_' + desc.id);
            textureIdFN.setAttribute('type', 'SFFloat');
            textureIdFN.setAttribute('value', tex_idx++);
            shaderN.appendChild(textureIdFN);
        };

        var vertexCode = 'attribute vec3 position; \n';
        vertexCode += 'attribute vec3 texcoord; \n';
        vertexCode += 'uniform mat4 modelViewProjectionMatrix; \n';
        vertexCode += 'varying vec2 fragTexCoord; \n';
        vertexCode += 'void main() { \n';
        vertexCode += 'fragTexCoord = vec2(texcoord.x, 1.0 - texcoord.y);\n';
        vertexCode += 'gl_Position = modelViewProjectionMatrix * vec4(position, 1.0); }\n';
        var shaderPartVertex = document.createElement('shaderPart');
        shaderPartVertex.setAttribute('type', 'VERTEX');
        shaderPartVertex.innerHTML = vertexCode;
        shaderN.appendChild(shaderPartVertex);

        var fragmentCode = this.createFragmentShaderCode(texture_descriptions, opts.name);

        var shaderPartFragment = document.createElement('shaderPart');
        shaderPartFragment.setAttribute('type', 'FRAGMENT');
        shaderPartFragment.innerHTML = fragmentCode;
        shaderN.appendChild(shaderPartFragment);

        this.fragmentShader = shaderPartFragment.innerHTML;

        return shaderN;
    };

    this.createMultiTextureN = function(texture_descriptions, namespace) {
        // <MultiTexture>
        // <ImageTexture url='texture/earth.jpg' />
        // <ImageTexture url='texture/normalMap.png' />
        // </MultiTexture>

        var multiTextureN = document.createElement('MultiTexture')
        for (var idx = 0; idx < texture_descriptions.length; idx++) {
            var desc = texture_descriptions[idx];

            var textureN = document.createElement('Texture');
            textureN.setAttribute('hideChildren', 'true');
            textureN.setAttribute('repeatS', 'true');
            textureN.setAttribute('repeatT', 'true');
            textureN.setAttribute('scale', 'false');
            textureN.appendChild(desc.textureEl);

            var textureTransformN = document.createElement('TextureTransform');
            textureTransformN.setAttribute('scale', '1,-1');
            if (opts.upright) {
                textureTransformN.setAttribute('rotation', '-1.57');
            }
            multiTextureN.appendChild(textureTransformN);

            multiTextureN.appendChild(textureN);
        }

        return multiTextureN;
    };

    this.createMaterialN = function(opts, namespace) {
        var materialN = document.createElement('material');
        materialN.setAttribute('specularColor', opts.specularColor);
        materialN.setAttribute('diffuseColor', opts.diffuseColor);
        materialN.setAttribute('transparency', opts.transparency);
        materialN.setAttribute('ID', namespace + '_mat');

        return materialN;
    };

    /**
     * FIXXME: adapt description!
     *
     * This function handles the creation and usage of the appearances. It can be called for every shape or LOD that should use a canvasTexture.
     * It returns the amount of appearances specified. For every name only one appearance exits, every other uses it.
     * @param AppearanceName - Name of the appearance. If this name is not set in the array, it will be registered.
     *      In the case the name is already set, the existing one will be used.
     * @param AppearanceCount - Number of appearance to be created. E.g. the LODs use a bunch of three appearance nodes.
     * @param modelIndex - Index of the model using this appearance.
     * @param canvasTexture - Canvas element to be used in the appearance as texture.
     * @param transparency - Transparency of the appearance.
     * @param specular - Specular color of the appearance.
     * @param diffuse - Diffuse color of the appearance.
     * @param upright - Flag if the terrain is upright (underground data) and the texture stands upright in the cube.
     * @returns {Array} - Array of appearance nodes. If any error occurs, the function will return null.
     */
    this.createAppearances = function(opts) {
        var appearanceN = new RBV.Renderer.Appearance({
            transparency: opts.transparency
        });

        if (this.appearancesN[opts.name]) { // use the already defined appearance
            appearanceN.el.setAttribute("use", this.appearancesN[opts.name]);
        } else {
            this.appearancesN[opts.name] = opts.name;
            appearanceN.el.setAttribute("id", this.appearancesN[opts.name]);
            appearanceN.el.setAttribute("def", this.appearancesN[opts.name]);

            var materialN = new RBV.Renderer.Material(opts);
            appearanceN.appendChild(materialN);

            this.multiTextureN = new RBV.Renderer.MultiTexture();
            for (var idx = 0; idx < opts.texture_descriptions.length; idx++) {
                this.multiTextureN.addTexture(new RBV.Renderer.Texture({
                    hideChildren: true,
                    repeatS: true,
                    repeatT: true,
                    canvasEl: opts.texture_descriptions[idx].textureEl
                }));
            }
            appearanceN.appendChild(this.multiTextureN);

            var shaderN = new RBV.Renderer.Shader();
            shaderN.setVertexCode(this.createVertexShaderCode());
            shaderN.setFragmentCode(this.createFragmentShaderCode(opts.texture_descriptions, opts.name));

            for (var idx = 0; idx < opts.texture_descriptions.length; idx++) {
                var desc = opts.texture_descriptions[idx];

                shaderN.addUniform({
                    id: opts.namespace + '_transparency_for_' + desc.id,
                    name: 'transparency_' + desc.id,
                    type: 'SFFloat',
                    value: desc.opacity
                });

                shaderN.addUniform({
                    id: opts.namespace + '_texture_for_' + desc.id,
                    name: 'tex_' + desc.id,
                    type: 'SFFloat',
                    value: idx
                });
            }
            appearanceN.appendChild(shaderN);
        }

        return [appearanceN.el];
    };

    this.createVertexShaderCode = function() {
        var vertexCode = 'attribute vec3 position; \n';
        vertexCode += 'attribute vec3 texcoord; \n';
        vertexCode += 'uniform mat4 modelViewProjectionMatrix; \n';
        vertexCode += 'varying vec2 fragTexCoord; \n';
        vertexCode += 'void main() { \n';
        vertexCode += 'fragTexCoord = vec2(texcoord.x, 1.0 - texcoord.y);\n';
        vertexCode += 'gl_Position = modelViewProjectionMatrix * vec4(position, 1.0); }\n';

        return vertexCode;
    };


    this.createFragmentShaderCode = function(texture_descriptions, namespace) {
        var fragmentCode = '#ifdef GL_ES \n';
        fragmentCode += 'precision highp float; \n';
        fragmentCode += '#endif \n';
        fragmentCode += 'varying vec2 fragTexCoord; \n';
        for (var idx = 0; idx < texture_descriptions.length; idx++) {
            var desc = texture_descriptions[idx];
            fragmentCode += 'uniform float transparency_' + desc.id + '; \n';
            fragmentCode += 'uniform sampler2D tex_' + desc.id + '; \n';
        }

        // Blending equation:
        // (see http://en.wikibooks.org/wiki/GLSL_Programming/Unity/Transparency)
        //
        // TODO: Think of integrating http://mouaif.wordpress.com/?p=94
        //
        // vec4 result = SrcFactor * colorOnTop + DstFactor * colorBelow;
        //
        // To implement a special blending mode, SrcFactor and DstFactor have to
        // be chosen correctly:
        //
        // * Alpha blending:
        // -----------------
        //
        //   SrcFactor = SrcAlpha = vec4(gl_FragColor.a)
        //   DstFactor = OneMinusSrcAlpha = vec4(1.0 - gl_FragColor.a)
        //
        // Corresponding GLSL code:
        fragmentCode += 'vec4 alphaBlend(vec4 colorOnTop, vec4 colorBelow) {        \n';
        fragmentCode += '  vec4 srcFac = vec4(colorOnTop.a);                        \n';
        fragmentCode += '  vec4 dstFac = vec4(1.0 - colorOnTop.a);                  \n';
        fragmentCode += '                                                           \n';
        fragmentCode += '  vec4 result = srcFac * colorOnTop + dstFac * colorBelow; \n';
        fragmentCode += '  return result;                                           \n';
        fragmentCode += '}                                                          \n';

        fragmentCode += 'void main() { \n';
        for (var idx = 0; idx < texture_descriptions.length; idx++) {
            var desc = texture_descriptions[idx];
            fragmentCode += '  vec4 color' + idx + ' = texture2D(tex_' + desc.id + ', fragTexCoord); \n';
            fragmentCode += '  color' + idx + ' = color' + idx + ' * transparency_' + desc.id + '; \n';
            if (idx == 0) {
                fragmentCode += '  vec4 colorOnTop = color0; \n';
            } else {
                fragmentCode += '  colorOnTop = alphaBlend(colorOnTop, color' + idx + '); \n';
            }
        }
        fragmentCode += '  gl_FragColor = colorOnTop; \n';
        // fragmentCode += '  gl_FragColor = vec4(0,0,1.0,1); \n';
        fragmentCode += '} \n';

        // console.log('fragmentCode:\n' + fragmentCode);

        return fragmentCode;
    };

    /**
     * Overwrites function from base terrain class. Sets the transparency in the shader.
     * @param value - Transparency value between 0 (full visible) and 1 (invisible).
     */
    this.setTransparencyFor = function(texture_id, value) {
        var transparencyFieldId = 'TerrainApp_' + this.index + '_transparency_for_' + texture_id;
        var transparencyFN = document.getElementById(transparencyFieldId);

        if (transparencyFN) {
            transparencyFN.setAttribute('value', String(1.0 - value));
        } else {
            console.log('RBV.Visualization.LODTerrainWithOverlays: Cannot find transparency field: ' + transparencyFieldId);
        }
    };
};

RBV.Visualization.LODTerrainWithOverlays.inheritsFrom(EarthServerGenericClient.AbstractTerrain);