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

/**
 * Removes all DOM data and recreates a new (empty) element.
 */
RBV.Renderer.Nodes.Base.prototype.removeFromDOM = function() {
	if (this.el.parentNode) {
		this.el.parentNode.removeChild(this.el);
	}
	RBV.Renderer.Nodes.Base.call(this, this.options);
}