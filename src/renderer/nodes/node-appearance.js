RBV.Renderer = RBV.Renderer || {};
RBV.Renderer.Nodes = RBV.Renderer.Nodes || {};

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