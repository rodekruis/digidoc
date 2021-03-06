'use strict';

/**
 * Module dependencies.
 */

var users = require('../../app/controllers/users'),
	forms = require('../../app/controllers/forms');
	
var mongoose = require('mongoose'),
	AMap = mongoose.model('AMap'),
	User = mongoose.model('User'),
	Visualisation = mongoose.model('Visualisation'),
	MapBounds = mongoose.model('MapBounds'),
	MapCenter = mongoose.model('MapCenter'),
	MapCategory = mongoose.model('MapCategory'),
	Monitor = mongoose.model('Monitor'),
	TileServer = mongoose.model('TileServer'),
	WmsLayer = mongoose.model('WmsLayer'),
	WfsLayer = mongoose.model('WfsLayer'),
	MarkerStyle = mongoose.model('MarkerStyle'),
	FeatureStyle = mongoose.model('FeatureStyle'),
	Source = mongoose.model('Source'),
	_ = require('lodash');
	
var formsAngular = require('forms-angular');

module.exports = function(app) {	
	// Add form handler
	var secureOptions = {authentication: [users.requiresLogin, forms.hasAuthorization]};
	var DataFormHandler = new (formsAngular)(app, secureOptions);
	DataFormHandler.addResource('amap', AMap, {title: 'Kaarten'});
	DataFormHandler.addResource('User', User, {title: 'Gebruikers'});
	DataFormHandler.addResource('visualisation', Visualisation, {title: 'CartoDB Visualisaties'});
	DataFormHandler.addResource('MapBounds', MapBounds, {title: 'Kaart grenzen'});
	DataFormHandler.addResource('MapCenter', MapCenter, {title: 'Kaarten centrum'});
	DataFormHandler.addResource('MapCategory', MapCategory, {title: 'Kaartcategorien'});
	DataFormHandler.addResource('Monitor', Monitor, {title: 'Monitor'});
	DataFormHandler.addResource('TileServer', TileServer, {title: 'Tile servers'});
	DataFormHandler.addResource('WmsLayer', WmsLayer, {title: 'WMS kaartlagen'});
	DataFormHandler.addResource('WfsLayer', WfsLayer, {title: 'WFS kaartlagen'});
	DataFormHandler.addResource('MarkerStyle', MarkerStyle, {title: 'Marker stijl'});
	DataFormHandler.addResource('FeatureStyle', FeatureStyle, {title: 'Feature Stijl'});
	DataFormHandler.addResource('Source', Source, {title: 'Brondata'});

};