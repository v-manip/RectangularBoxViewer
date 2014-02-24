RBV.Renderer = RBV.Renderer || {};

// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
//
// Note: Copied verbatim from Backbone (www.backbonejs.org).
var extend = function(protoProps, staticProps) {
	var parent = this;
	var child;

	// The constructor function for the new subclass is either defined by you
	// (the "constructor" property in your `extend` definition), or defaulted
	// by us to simply call the parent's constructor.
	if (protoProps && _.has(protoProps, 'constructor')) {
		child = protoProps.constructor;
	} else {
		child = function() {
			return parent.apply(this, arguments);
		};
	}

	// Add static properties to the constructor function, if supplied.
	_.extend(child, parent, staticProps);

	// Set the prototype chain to inherit from `parent`, without calling
	// `parent`'s constructor function.
	var Surrogate = function() {
		this.constructor = child;
	};
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;

	// Add prototype properties (instance properties) to the subclass,
	// if supplied.
	if (protoProps) _.extend(child.prototype, protoProps);

	// Set a convenience property in case the parent's prototype is needed
	// later.
	child.__super__ = parent.prototype;

	return child;
};

RBV.Renderer.Node = function(options) {
	this.el = null;
	this.options = options || {}; // FIXXME: replace with some 'arguments' logic?

	if (!this.options.el) {
		if (this.tagName) {
			this.el = document.createElement(this.tagName);
		} else {
			this.el = document.createElement('Field');
		}
		// console.log('Created element "' + this.tagName + '"');
	} else {
		this.el = this.options.el;
	}

	if (_.isFunction(this.initialize)) {
		this.initialize.apply(this, arguments);
	}
}
RBV.Renderer.Node.extend = extend;

RBV.Renderer.Appearance = RBV.Renderer.Node.extend({
	tagName: 'Appearance',

	initialize: function(opts) {
		if (opts.transparency === 0) {
			this.el.setAttribute('sortType', 'opaque');
		} else {
			this.el.setAttribute('sortType', 'transparent');
		}

		this.nodes = {};

		// FIXXME: integrate automatic def/use mechanism
		// this.el.setAttribute("id", this.appearancesN[opts.name]);
		// this.el.setAttribute("def", this.appearancesN[opts.name]);
	},

	appendChild: function(node) {
		this.nodes[node.tagName] = node;
		this.el.appendChild(node.el);
	},

	appendMultiTexture: function(node) {
		this.multiTextureN = node;
		this.el.appendChild(node.el);
	},

	appendShader: function(node) {
		this.shaderN = node;
		this.el.appendChild(node.el);
	},

	replaceMultiTexture: function(node) {
		this.el.removeChild(this.multiTextureN.el);
		this.multiTextureN = node;
		this.el.appendChild(this.multiTextureN.el);
	},

	replaceShader: function(node) {
		this.el.removeChild(this.shaderN.el);
		this.shaderN = node;
		this.el.appendChild(this.shaderN.el);
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
		uniformFN.setAttribute('id', String(opts.id));
		uniformFN.setAttribute('name', opts.name);
		uniformFN.setAttribute('type', opts.type);
		uniformFN.setAttribute('value', String(opts.value));

		this.el.appendChild(uniformFN);
	}
});

RBV.Renderer.Texture = RBV.Renderer.Node.extend({
	tagName: 'Texture',

	initialize: function(opts) {
		this.el.setAttribute('hideChildren', String(opts.hideChildren) || 'true');
		this.el.setAttribute('repeatS', String(opts.repeatS) || 'true');
		this.el.setAttribute('repeatT', String(opts.repeatT) || 'true');
		this.el.setAttribute('scale', String(opts.scale) || 'false');
		this.el.appendChild(opts.canvasEl);
	}
});

RBV.Renderer.TextureTransform = RBV.Renderer.Node.extend({
	tagName: 'TextureTransform',

	initialize: function(opts) {
		this.el.setAttribute('scale', String(opts.scale) || '1,-1');
		this.el.setAttribute('rotation', String(opts.rotation) || '-1.57');
	}
});

RBV.Renderer.Material = RBV.Renderer.Node.extend({
	tagName: 'Material',

	initialize: function(opts) {
		this.el.setAttribute('specularColor', opts.specularColor);
		this.el.setAttribute('diffuseColor', opts.diffuseColor);
		this.el.setAttribute('transparency', opts.transparency);
		this.el.setAttribute('ID', opts.namespace + '_mat');
	}
});

RBV.Renderer.MultiTexture = RBV.Renderer.Node.extend({
	tagName: 'MultiTexture',

	addTexture: function(texture, transform) {
		this.el.appendChild(texture.el);
		if (typeof transform !== 'undefined') {
			this.el.appendChild(transform.el);
		} else {
			var t = new RBV.Renderer.TextureTransform({
				scale: '1,-1',
				rotation: 0
			});
			this.el.appendChild(t.el);
		}
	}
});