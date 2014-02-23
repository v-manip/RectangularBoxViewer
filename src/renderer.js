RBV.Renderer = RBV.Renderer || {};

var extend = function(child) {
	var base = this;

	if (child) {
		for (var prop in child) {
			base[prop] = child[prop];
		}

		for (var prop in child) {
			base.prototype[prop] = child[prop];
		}
	}
	return base;
};

RBV.Renderer.Base = function(options) {
	this.el = null;
	this.options = options || {};

	if (_.isFunction(this.initialize)) {
		this.initialize.apply(this, arguments);
	}
}
RBV.Renderer.Base.extend = extend;

RBV.Renderer.Node = RBV.Renderer.Base.extend({
	tagName: 'Field',

	_ensureElement: function() {
		if (!this.el) {
			this.el = document.createElement(this.tagName);
			console.log('Created element "' + this.tagName + '"');
		}
	},

	initialize: function() {
		this._ensureElement();
	},
});

RBV.Renderer.Appearance = RBV.Renderer.Node.extend({
	tagName: 'Appearance',

	appendChild: function(node) {
		this.el.appendChild(node);
	}
});

RBV.Renderer.Shader = RBV.Renderer.Node.extend({
	tagName: 'ComposedShader',

	vertexUrl: '',

	fragmentUrl: '',

	initialize: function(opts) {
		// TODO: 
		// if (this.vertexUrl)
		//	fetch url and set as vertex code
		// if (this.fragmentUrl)
		//	fetch url and set as fragment code
	},

	setVertexCode: function(text) {
		var shaderPart = document.createElement('shaderPart');
		shaderPart.setAttribute('type', 'VERTEX');
		shaderPart.innerHTML = text;
		this.el.appendChild(shaderPart);
	},

	setFragmentCode: function(text) {
		var shaderPart = document.createElement('shaderPart');
		shaderPart.setAttribute('type', 'FRAGMENT');
		shaderPart.innerHTML = text;
		this.el.appendChild(shaderPart);
	},

	addUniform: function(opts) {
		var uniformFN = document.createElement('field');
		uniformFN.setAttribute('id', opts.id);
		uniformFN.setAttribute('name', opts.name);
		uniformFN.setAttribute('type', opts.type);
		uniformFN.setAttribute('value', String(opts.value));

		this.el.appendChild(uniformFN);
	}

});

RBV.Renderer.Texture = RBV.Renderer.Node.extend({
	tagName: 'Texture',

	initialize: function(opts) {
		this._ensureElement();

		this.el.setAttribute('hideChildren', opts.hideChildren || 'true');
		this.el.setAttribute('repeatS', opts.repeatS || 'true');
		this.el.setAttribute('repeatT', opts.repeatT || 'true');
		this.el.setAttribute('scale', opts.scale || 'false');
		this.el.appendChild(opts.canvasEl);
	}
});

RBV.Renderer.TextureTransform = RBV.Renderer.Node.extend({
	tagName: 'TextureTransform',

	initialize: function(opts) {
		this._ensureElement();

		this.el.setAttribute('scale', opts.scale || '1,-1');
		this.el.setAttribute('rotation', opts.rotation || '-1.57');
	}
});

RBV.Renderer.Material = RBV.Renderer.Node.extend({
	tagName: 'Material',

	initialize: function(opts) {
		this._ensureElement();

		this.el.setAttribute('specularColor', opts.specularColor);
		this.el.setAttribute('diffuseColor', opts.diffuseColor);
		this.el.setAttribute('transparency', opts.transparency);
		this.el.setAttribute('ID', opts.namespace + '_mat');
	}
});

RBV.Renderer.MultiTexture = RBV.Renderer.Node.extend({
	tagName: 'MultiTexture',

	addTexture: function(texture) {
		this.el.appendChild(texture.el);
	}
});