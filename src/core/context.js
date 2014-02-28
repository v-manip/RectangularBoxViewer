var RBV = RBV || {};

/**
 * @class Context: Defines data and state for a model. Changes to the visualization
 * of a model are done solely via the context object.
 */
RBV.Context = function(opts) {
	// FIXXME: These will be removed after the transition to a refactored VMANIP framework.
	this.legacyContext = opts.mediator;
	this.legacyGlobals = opts.globals;

	this.toi = opts.toi || null;
	if (typeof opts.aoi !== 'undefined') {
		this.aoi = opts.aoi[0];
		this.aoi.push(opts.aoi[1]);
		this.aoi.push(opts.aoi[2]);
	} else {
		this.aoi = null;
	}

	this.layers = {};
};
_.extend(RBV.Context.prototype, Backbone.Events);

RBV.Context.prototype.reset = function() {
	this.layers = {};
};

RBV.Context.prototype.setToI = function(timespan) {
	this.toi = timespan;
};

RBV.Context.prototype.setAoI = function(bbox, min_height, max_height) {
	this.aoi = bbox;
	this.aoi.push(min_height, max_height);
};

RBV.Context.prototype.addLayer = function(type, id, layer) {
	if (!this.layers[type]) {
		this.layers[type] = [];
	}
	this.layers[type].push(layer);
};

RBV.Context.prototype.getLayerById = function(id, type) {
	if (!this.layers[type]) {
		return null;
	}

	for (var idx = 0; idx < this.layers[type].length; idx++) {
		if (this.layers[type][idx].id === id) {
			return this.layers[type][idx].layer;
		}
	};

	return null;
};

RBV.Context.prototype.getLayersByType = function(type) {
	if (!this.layers[type]) {
		return [];
	}

	return this.layers[type];
};

/**
 * Returns the model of the currently selected layers. If a 'filter' function is given it will be applied to check
 * if the model is compatible with the given filter.
 */
RBV.Context.prototype.getSelectedLayersByType = function(type, filter) {
	var models_desc = {};

	this.legacyGlobals.baseLayers.each(function(model) {
		if (model.get('visible')) {
			if (typeof filter !== 'undefined') {
				if (filter(model)) {
					models_desc[model.get('name')] = {
						model: model,
						type: 'baselayer'
					};
					// console.log('[BaseView::setLayersFromAppContext] added baselayer "' + model.get('name') + '"');
				}
			} else {
				models_desc[model.get('name')] = {
					model: model,
					type: 'baselayer'
				};
			}
		}
	});

	this.legacyGlobals.products.each(function(model) {
		if (model.get('visible')) {
			if (typeof filter !== 'undefined') {
				if (filter(model)) {
					models_desc[model.get('name')] = {
						model: model,
						type: 'product'
					};
					// console.log('[BaseView::setLayersFromAppContext] added product "' + model.get('name') + '"');
				}
			} else {
				models_desc[model.get('name')] = {
					model: model,
					type: 'product'
				};
			}
		}
	});

	this.legacyGlobals.overlays.each(function(model) {
		if (model.get('visible')) {
			if (typeof filter !== 'undefined') {
				if (filter(model)) {
					models_desc[model.get('name')] = {
						model: model,
						type: 'overlay'
					};
					// console.log('[BaseView::setLayersFromAppContext] added overlay "' + model.get('name') + '"');
				}
			} else {
				models_desc[model.get('name')] = {
					model: model,
					type: 'overlay'
				};
			}
		}
	});

	var selectedLayers = [];

	_.forEach(models_desc, function(desc, key) {
		var layer = null;
		var model = desc.model;
		if (desc.type === 'baselayer') {
			// Find compatible baselayer protocol:
			var view = _.find(model.get('views'), function(view) {
				return view.protocol.toUpperCase() === 'WMS';
			});

			layer = new VMANIP.Layers.WMS({
				id: view.id,
				urls: view.urls,
				crs: 'EPSG:4326',
				format: view.format.replace('image/', ''),
				transparent: 'false',
				// FIXXME: '0' would be more intuitive, however, that goes against the necessary ordering in the TextureBlend effect
				ordinal: 10000, // A base layer is always the most bottom layer.
				opacity: 1 //model.get('opacity')
			});
		} else {
			layer = new VMANIP.Layers.WMS({
				id: model.get('view').id,
				urls: model.get('view').urls,
				crs: 'EPSG:4326',
				format: model.get('view').format.replace('image/', ''),
				transparent: 'true',
				ordinal: model.get('ordinal'),
				opacity: model.get('opacity')
			});
		}
		selectedLayers.push(layer);
	});

	return selectedLayers;
}