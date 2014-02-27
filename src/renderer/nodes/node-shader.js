RBV.Renderer = RBV.Renderer || {};
RBV.Renderer.Nodes = RBV.Renderer.Nodes || {};

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
	}
});