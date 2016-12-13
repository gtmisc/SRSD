var request = require('supertest');
var mocha		= require('mocha');
app = require('../server');

describe('GET /api/T002', function() {
	it('should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/T002')
			.expect(200, done);
	});
});

describe('GET /api/T002/all', function() {
	it('should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/T002/all')
			.expect(200, done);
	});
});

describe('GET /api/T002/lastest', function() {
	it('should respond with "Status 200 OK"', function(done) {
		request(app)
			.get('/api/T002/latest')
			.expect(200, done);
	});
});
