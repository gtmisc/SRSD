var request = require('supertest');
var expect	= require('chai').expect;
var sinon		= require('sinon');
var app		= require('../server');

/// Get the model
var nasdaq = require('../models/nasdaq');

describe('ROUTES: ', function() {
	it('/api/nasdaq/all should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/nasdaq/all')
			.expect(200, done);
	});

	it('/api/nasdaq/latest should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/nasdaq/latest')
			.expect(200, done);
	});

	it('/api/nasdaq/daterange should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/nasdaq/daterange')
			.expect(200, done);
	});
});
