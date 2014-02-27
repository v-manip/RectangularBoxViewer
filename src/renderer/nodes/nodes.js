RBV.Renderer = RBV.Renderer || {};
RBV.Renderer.Nodes = RBV.Renderer.Nodes || {};

RBV.Renderer.Nodes.Base = function(options) {
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
RBV.Renderer.Nodes.Base.extend = RBV.extend;

RBV.Renderer.Nodes.Appearance = RBV.Renderer.Nodes.Base.extend({
	tagName: 'Appearance',

	initialize: function(opts) {
		if (opts.transparency === 0) {
			this.el.setAttribute('sortType', 'opaque');
		} else {
			this.el.setAttribute('sortType', 'transparent');
		}

		if (opts.use) {
			this.el.setAttribute("use", opts.use);

		} else {
			this.el.setAttribute("id", opts.id);
			this.el.setAttribute("def", opts.id);
		}

		this.shaderN = null;
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
		if (this.shaderN) {
			this.el.removeChild(this.shaderN.el);
		}
		this.shaderN = node;
		this.el.appendChild(this.shaderN.el);
	},

	reset: function() {
		this.shaderN.removeFromDOM();
		this.multiTextureN.removeFromDOM();
	}
});

RBV.Renderer.Nodes.Shader = RBV.Renderer.Nodes.Base.extend({
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
	},

	// Removes all DOM data and recreates a new (empty) element.
	removeFromDOM: function() {
		if (this.el.parentNode) {
			this.el.parentNode.removeChild(this.el);
		}
		RBV.Renderer.Nodes.Base.call(this, this.options);
	}
});

RBV.Renderer.Nodes.Texture = RBV.Renderer.Nodes.Base.extend({
	tagName: 'Texture',

	initialize: function(opts) {
		this.el.setAttribute('hideChildren', String(opts.hideChildren) || 'true');
		this.el.setAttribute('repeatS', String(opts.repeatS) || 'true');
		this.el.setAttribute('repeatT', String(opts.repeatT) || 'true');
		this.el.setAttribute('scale', String(opts.scale) || 'false');
		this.el.appendChild(opts.canvasEl);
	}
});

RBV.Renderer.Nodes.TextureTransform = RBV.Renderer.Nodes.Base.extend({
	tagName: 'TextureTransform',

	initialize: function(opts) {
		this.el.setAttribute('scale', String(opts.scale) || '1,-1');
		this.el.setAttribute('rotation', String(opts.rotation) || '-1.57');
	}
});

RBV.Renderer.Nodes.Material = RBV.Renderer.Nodes.Base.extend({
	tagName: 'Material',

	initialize: function(opts) {
		this.el.setAttribute('specularColor', opts.specularColor);
		this.el.setAttribute('diffuseColor', opts.diffuseColor);
		this.el.setAttribute('transparency', opts.transparency);
		this.el.setAttribute('ID', opts.namespace + '_mat');
	}
});

RBV.Renderer.Nodes.MultiTexture = RBV.Renderer.Nodes.Base.extend({
	tagName: 'MultiTexture',

	addTexture: function(texture, transform) {
		this.el.appendChild(texture.el);
		if (typeof transform !== 'undefined') {
			this.el.appendChild(transform.el);
		} else {
			var t = new RBV.Renderer.Nodes.TextureTransform({
				scale: '1,-1',
				rotation: 0
			});
			this.el.appendChild(t.el);
		}
	},

	// Removes all DOM data and recreates a new (empty) element.
	removeFromDOM: function() {
		if (this.el.parentNode) {
			this.el.parentNode.removeChild(this.el);
		}
		RBV.Renderer.Nodes.Base.call(this, this.options);
	}
});