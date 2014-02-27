RBV.Renderer = RBV.Renderer || {};
RBV.Renderer.Nodes = RBV.Renderer.Nodes || {};

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
	}
});