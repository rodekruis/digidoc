'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Monitor = mongoose.model('Monitor');

/**
 * Globals
 */
var user, monitor;

/**
 * Unit tests
 */
describe('Monitor Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			monitor = new Monitor({
				title: 'Map Title',
				content: 'Map Content',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return monitor.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			monitor.title = '';

			return monitor.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Monitor.remove().exec();
		User.remove().exec();
		done();
	});
});