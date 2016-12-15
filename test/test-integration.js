var request = require('supertest');
var expect	= require('chai').expect;
var sinon		= require('sinon');
var app		= require('../server');

/// Get the model
var T002 = require('../models/t002');

describe('ROUTES: ', function() {
	it('/api/T002/all should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/T002/all')
			.expect(200, done);
	});

	it('/api/T002/latest should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/T002/latest')
			.expect(200, done);
	});

	it('/api/T002/daterange should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/T002/daterange')
			.expect(200, done);
	});
});
