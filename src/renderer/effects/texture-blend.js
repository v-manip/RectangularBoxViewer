RBV.Renderer = RBV.Renderer || {};
RBV.Renderer.Effects = RBV.Renderer.Effects || {};

RBV.Renderer.Effects.TextureBlend = function(opts) {
	this._appearanceN = null;
	this._materialN = null;
	this._shaderN = null;
	this._multiTextureN = null;
	this._textureDescs = [];

	this._id = opts.id || 'Effect::TextureBlend';

	this._options = opts;

	this._setup();
}

RBV.Renderer.Effects.TextureBlend.prototype._setup = function() {
	this._appearanceN = new RBV.Renderer.Nodes.Appearance({
		id: this._id,
		transparency: this._options.transparency
	});
	// FIXXME: currently the appearance is added to all X3D scenes
	// in the page so that it can be 'used'. Make this configurable!
	var x3d_scenes = document.getElementsByTagName('scene');
	for (var idx = 0; idx < x3d_scenes.length; idx++) {
		var scene = x3d_scenes[idx];
		scene.appendChild(this._appearanceN.el);
	};

	// this._materialN = new RBV.Renderer.Nodes.Material({
	// 	specularColor: this._options.material.specular,
	// 	diffuseColor: this._options.material.diffuse,
	// 	transparency: this._options.material.transparency
	// });
	// this._appearanceN.appendChild(this._materialN);

	this._multiTextureN = new RBV.Renderer.Nodes.MultiTexture();
	this._appearanceN.appendMultiTexture(this._multiTextureN);

	this._shaderN = new RBV.Renderer.Nodes.Shader();
};

RBV.Renderer.Effects.TextureBlend.prototype.reset = function(desc) {
	this._textureDescs = [];
	// The appearance internally resets this._shaderN and this._multiTextureN
	// as a 'sideeffect':
	this._appearanceN.reset();
};

RBV.Renderer.Effects.TextureBlend.prototype.addTextureFromDesc = function(desc) {
	// FIXXME: integrate desc.transform, to be able to cleanup when removing a texture!
	this._textureDescs.push({
		id: desc.id,
		textureEl: desc.textureEl,
		opacity: desc.opacity,
		ordinal: desc.ordinal,
		transform: desc.transform
	});
};

RBV.Renderer.Effects.TextureBlend.prototype.commitChanges = function() {
	this._textureDescs = _.sortBy(this._textureDescs, function(desc) {
		return desc.ordinal
	});
	// this._textureDescs.reverse();

	this._updateMultiTextureNode();
	this._updateShaderNode();

	console.log('[RBV.Renderer.Effects.TextureBlend.TextureBlend] Texturestack:');
	_.forEach(this._textureDescs, function(desc, idx) {
		console.log('  * ordinal: ' + desc.ordinal + ' / id: ' + desc.id);
	})
};

RBV.Renderer.Effects.TextureBlend.prototype.appearance = function() {
	return new RBV.Renderer.Nodes.Appearance({
		use: this._id,
		transparency: this._options.transparency
	});
};

RBV.Renderer.Effects.TextureBlend.prototype.id = function() {
	return this._id;
};

RBV.Renderer.Effects.TextureBlend.prototype._updateMultiTextureNode = function() {
	// FIXXME: rethink sideeffects regarding removeFromDOM/appendMultiTexture/replaceMultiTexture!
	// For now it is working and properly encapsulated...
	this._multiTextureN.removeFromDOM();
	for (var idx = 0; idx < this._textureDescs.length; idx++) {
		var desc = this._textureDescs[idx];

		// FIXXME: 'texture' parameter should support type RBV.Renderer.Nodes.Texture for consistency!
		this._multiTextureN.addTexture(new RBV.Renderer.Nodes.Texture({
			hideChildren: false,
			repeatS: true,
			repeatT: true,
			canvasEl: desc.textureEl
		}), desc.transform);
	};

	this._appearanceN.appendMultiTexture(this._multiTextureN);
}

RBV.Renderer.Effects.TextureBlend.prototype._updateShaderNode = function() {
	// FIXXME: rethink sideeffects regarding removeFromDOM/appendShader/replaceShader!
	// For now it is working and properly encapsulated...
	this._shaderN.removeFromDOM();
	this._shaderN.setVertexCode(this._createVertexShaderCode());
	this._shaderN.setFragmentCode(this._createFragmentShaderCode());

	for (var idx = 0; idx < this._textureDescs.length; idx++) {
		var desc = this._textureDescs[idx];

		this._shaderN.addUniform({
			id: this._id + '_transparency_for_' + desc.id,
			name: 'transparency_' + desc.id,
			type: 'SFFloat',
			value: desc.opacity
		});

		this._shaderN.addUniform({
			id: this._id + '_texture_for_' + desc.id,
			name: 'tex_' + desc.id,
			type: 'SFFloat',
			value: idx
		});
	}

	this._appearanceN.appendShader(this._shaderN);
}

RBV.Renderer.Effects.TextureBlend.prototype._createVertexShaderCode = function() {
	var vertexCode = 'attribute vec3 position; \n';
	vertexCode += 'attribute vec3 texcoord; \n';
	vertexCode += 'uniform mat4 modelViewProjectionMatrix; \n';
	vertexCode += 'varying vec2 fragTexCoord; \n';
	vertexCode += 'void main() { \n';
	vertexCode += 'fragTexCoord = vec2(texcoord.x, texcoord.y);\n';
	vertexCode += 'gl_Position = modelViewProjectionMatrix * vec4(position, 1.0); }\n';

	return vertexCode;
};

RBV.Renderer.Effects.TextureBlend.prototype._createFragmentShaderCode = function() {
	var fragmentCode = '#ifdef GL_ES \n';
	fragmentCode += 'precision highp float; \n';
	fragmentCode += '#endif \n';
	fragmentCode += 'varying vec2 fragTexCoord; \n';
	for (var idx = 0; idx < this._textureDescs.length; idx++) {
		var desc = this._textureDescs[idx];
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
	for (var idx = 0; idx < this._textureDescs.length; idx++) {
		var desc = this._textureDescs[idx];
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

	console.log('fragmentCode:\n' + fragmentCode);

	return fragmentCode;
};