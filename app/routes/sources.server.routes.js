'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var sources = require('../../app/controllers/sources');

	// Sources Routes
	app.route('/sources')
		.get(sources.list, sources.hasAuthorization)
		.post(users.requiresLogin, sources.hasAuthorization, sources.create);
	
	app.route('/sources/:sourceId')
		.get(sources.read, sources.hasAuthorization)
		.put(users.requiresLogin, sources.hasAuthorization, sources.update)
	    .delete(users.requiresLogin, sources.hasAuthorization, sources.delete);

	// Finish by binding the Source middleware
	app.param('sourceId', sources.sourceByID);
};