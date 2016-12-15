/// Test for ./models/nasdaq.js

var chai      = require('chai');
var assert    = chai.assert;
var expect    = chai.expect;
var mongoose  = require('mongoose');
var sinon     = require('sinon');
require('sinon-mongoose');

/// Get the model
var nasdaq = require('../models/nasdaq');

describe('nasdaq model:', function () {
  var nasdaqMock = sinon.mock(new nasdaq({}));
  var nasdaqObj = nasdaqMock.object;

  it('value is required', function (done) {
    nasdaqObj.validate(function(err) {
      expect(err).to.exist;
      expect(err.errors.value).to.exist;
      done();
    });
  });

  it('change is required', function (done) {
    nasdaqObj.validate(function(err) {
      expect(err).to.exist;
      expect(err.errors.change).to.exist;
      done();
    });
  });

  it('percentchange is required', function (done) {
    nasdaqObj.validate(function(err) {
      expect(err).to.exist;
      expect(err.errors.percentchange).to.exist;
      done();
    });
  });

});

describe('nasdaq model method:', function () {
  var nasdaqMock = sinon.mock(new nasdaq({ value: 12345.67}));
  var nasdaqObj = nasdaqMock.object;

  it('getValue', function () {
    assert.equal(nasdaqObj.getValue(), nasdaqMock.object.value);
  });
});

