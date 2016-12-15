/// Test for ./models/t002.js

var chai      = require('chai');
var assert    = chai.assert;
var expect    = chai.expect;
var mongoose  = require('mongoose');
var sinon     = require('sinon');
require('sinon-mongoose');

/// Get the model
var T002 = require('../models/t002');

describe('t002 model:', function () {
  var t002Mock = sinon.mock(new T002({}));
  var t002 = t002Mock.object;

  it('value is required', function (done) {
    t002.validate(function(err) {
      expect(err).to.exist;
      expect(err.errors.value).to.exist;
      done();
    });
  });

  it('change is required', function (done) {
    t002.validate(function(err) {
      expect(err).to.exist;
      expect(err.errors.change).to.exist;
      done();
    });
  });

  it('percentchange is required', function (done) {
    t002.validate(function(err) {
      expect(err).to.exist;
      expect(err.errors.percentchange).to.exist;
      done();
    });
  });

});

describe('t002 model method:', function () {
  var t002Mock = sinon.mock(new T002({ value: 12345.67}));
  var t002 = t002Mock.object;

  it('getValue', function () {
    assert.equal(t002.getValue(), t002Mock.object.value);
  });
});

