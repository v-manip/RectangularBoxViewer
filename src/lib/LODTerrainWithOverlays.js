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

    /**
     * The Scene Manager calls this function after a few frames since the last insertion of a chunk.
     */
    this.nextFrame = function() {
        //Build all necessary information and values to create a chunk
        var info = this.createChunkInfo(this.index, chunkSize, chunkInfo, currentChunk, this.data.width, this.data.height);
        var hm = this.getHeightMap(info);

        // Generate one texture for each 'imagery' ServerResponse:
        var texture_descriptions = [];
        for (var idx = 0; idx < this.textureResponses.length; idx++) {
            var textureData = this.textureResponses[idx].texture;
            var textureEl = this.createCanvas(textureData, this.index, this.noDataValue, false);

            texture_descriptions.push({
                id: this.textureResponses[idx].layerName,
                textureEl: textureEl
            });
        };

        var appearances = this.configureAppearances({
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

    /**
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
    this.configureAppearances = function(opts) {
        var appearanceN = document.createElement('Appearance');

        if (opts.transparency === 0) {
            appearanceN.setAttribute('sortType', 'opaque');
        } else {
            appearanceN.setAttribute('sortType', 'transparent');
        }

        if (this.appearancesN[opts.name]) // use the already defined appearance
        {
            appearanceN.setAttribute("use", this.appearancesN[opts.name]);
        } else {
            this.appearancesN[opts.name] = opts.name;
            appearanceN.setAttribute("id", this.appearancesN[opts.name]);
            appearanceN.setAttribute("def", this.appearancesN[opts.name]);

            var materialN = document.createElement('material');
            materialN.setAttribute('specularColor', opts.specularColor);
            materialN.setAttribute('diffuseColor', opts.diffuseColor);
            materialN.setAttribute('transparency', opts.transparency);
            materialN.setAttribute('ID', opts.name + '_mat');
            appearanceN.appendChild(materialN);

            // var myshader = document.getElementById('myshader');
            // // var shader = myshader.cloneNode(false);
            // var shader = $('#myshader').clone().attr('id', AppearanceName + '_mat');
            // appearanceN.appendChild(shader.get()[0]);
            // console.log('shader: ', shader.get()[0]);

            // <MultiTexture>
            // <ImageTexture url='texture/earth.jpg' />
            // <ComposedCubeMapTexture repeatS='false' repeatT='false'>
            //     <ImageTexture containerField='back' url='texture/generic/BK.png' />
            //     <ImageTexture containerField='bottom' url='texture/generic/DN.png' />
            //     <ImageTexture containerField='front' url='texture/generic/FR.png' />
            //     <ImageTexture containerField='left' url='texture/generic/LF.png' />
            //     <ImageTexture containerField='right' url='texture/generic/RT.png' />
            //     <ImageTexture containerField='top' url='texture/generic/UP.png' />
            // </ComposedCubeMapTexture>
            // <ImageTexture url='texture/normalMap.png' />
            // </MultiTexture>
            //
            // <ComposedShader DEF='ComposedShader'>
            //           <field name='tex' type='SFInt32' value='0'/>
            //           <field name='cube' type='SFInt32' value='1'/>
            //           <field name='bump' type='SFInt32' value='2'/> 

            //         <ShaderPart type='FRAGMENT'>
            //                 #ifdef GL_ES
            //                   precision highp float;
            //                 #endif

            //                 uniform sampler2D tex;
            //                 uniform samplerCube cube;
            //                 uniform sampler2D bump;
            //                 ...
            //         </ShaderPart>
            //         ...
            // </ConposedShader>

            var multiTextureN = document.createElement('MultiTexture')
            for (var idx = 0; idx < opts.texture_descriptions.length; idx++) {
                var desc = opts.texture_descriptions[idx];

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

            appearanceN.appendChild(multiTextureN);

            var cShaderN = document.createElement('ComposedShader');

            var tex_idx = 0;
            for (var idx = 0; idx < opts.texture_descriptions.length; idx++) {
                var desc = opts.texture_descriptions[idx];

                var transparencyFN = document.createElement('field');
                transparencyFN.setAttribute('id', opts.name + '_transparency_for_' + desc.id);
                transparencyFN.setAttribute('name', 'transparency_' + desc.id);
                transparencyFN.setAttribute('type', 'SFFloat');
                transparencyFN.setAttribute('value', '1');
                cShaderN.appendChild(transparencyFN);

                this.transparencysFN[opts.name + '_transparency_for_' + desc.id] = transparencyFN;

                // // Testing only:
                // var fadeOut = function() {
                //     var value = transparencyFN.getAttribute('value');
                //     transparencyFN.setAttribute('value', String(value - 0.1));
                //     setTimeout(fadeOut, 200);
                // };
                // setTimeout(fadeOut, 5000);

                var textureIdFN = document.createElement('field');
                textureIdFN.setAttribute('id', opts.name + '_texture_for_' + desc.id);
                textureIdFN.setAttribute('name', 'tex_' + desc.id);
                textureIdFN.setAttribute('type', 'SFFloat');
                textureIdFN.setAttribute('value', tex_idx++);
                cShaderN.appendChild(textureIdFN);
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
            cShaderN.appendChild(shaderPartVertex);

            var fragmentCode = '#ifdef GL_ES \n';
            fragmentCode += 'precision highp float; \n';
            fragmentCode += '#endif \n';
            fragmentCode += 'varying vec2 fragTexCoord; \n';
            for (var idx = 0; idx < opts.texture_descriptions.length; idx++) {
                var desc = opts.texture_descriptions[idx];
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
            for (var idx = 0; idx < opts.texture_descriptions.length; idx++) {
                var desc = opts.texture_descriptions[idx];
                fragmentCode += '  vec4 color' + idx + ' = texture2D(tex_' + desc.id + ', fragTexCoord); \n';
                fragmentCode += '  color' + idx + ' = color' + idx + ' * transparency_' + desc.id + '; \n';
                if (idx == 0) {
                    fragmentCode += '  vec4 colorOnTop = color0; \n';
                } else {
                    fragmentCode += '  colorOnTop = alphaBlend(colorOnTop, color' + idx + '); \n';
                }
            }
            fragmentCode += '  gl_FragColor = colorOnTop; \n';
            fragmentCode += '} \n';

            // console.log('fragmentCode:\n' + fragmentCode);

            var shaderPartFragment = document.createElement('shaderPart');
            shaderPartFragment.setAttribute('type', 'FRAGMENT');
            shaderPartFragment.innerHTML = fragmentCode;
            cShaderN.appendChild(shaderPartFragment);

            appearanceN.appendChild(cShaderN);
        }

        return [appearanceN];
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