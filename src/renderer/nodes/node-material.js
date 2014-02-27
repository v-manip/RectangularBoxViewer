RBV.Renderer = RBV.Renderer || {};
RBV.Renderer.Nodes = RBV.Renderer.Nodes || {};

RBV.Renderer.Nodes.Material = RBV.Renderer.Nodes.Base.extend({
	tagName: 'Material',

	initialize: function(opts) {
		this.el.setAttribute('specularColor', opts.specularColor);
		this.el.setAttribute('diffuseColor', opts.diffuseColor);
		this.el.setAttribute('transparency', opts.transparency);
		this.el.setAttribute('ID', opts.namespace + '_mat');
	}
});