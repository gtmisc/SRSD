/// Test Controller
var sinon     = require('sinon');
var assert    = require('chai').assert;

var T002 = require('../models/t002');
var factory = require('./factory-test-records');
var controller  = require('../app/controller')(T002);

describe('controller', function () {

  beforeEach(function () {
    sinon.stub(T002, 'find');
  });

  afterEach(function () {
    T002.find.restore();
  });

  var records = [];
  for (var i = 1; i <= 10; ++i) {
    var date = new Date('2016-01-' + (i+10));
    records.push(factory.genRecord(i*100, i, date));
    // console.log(records[i-1]);
  }

  it('getAllRecords', function (done) {
    T002.find.yields(null, records);
    var req = { params: {} };
    var res = {
      json: sinon.stub()
    };
    controller.getAllRecords(req, res);
    sinon.assert.calledWith(res.json, records);
    done();
  });

  it('getLatestRecord', function (done) {
    T002.find.yields(null, records);
    var req = { params: {} };
    var res = {
      json: sinon.stub()
    };
    controller.getLatestRecord(req, res);
    sinon.assert.calledWith(res.json, records[records.length - 1]);
    done();
  });

  it('getRecordsRange without from and to parameters', function (done) {
    T002.find.yields(null, records);
    var req = {
      query: {
        // from: '2016-01-15T00:00:00.000Z', 
        // to:   '2016-01-17T00:00:00.000Z'
      }
    };
    var res = {
      json: sinon.stub()
    };
    controller.getRecordsRange(req, res);
    sinon.assert.calledWith(res.json, records);
    done();
  });

});
