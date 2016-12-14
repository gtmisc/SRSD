/// Test for ./models/t002.js

var chai      = require('chai');
var assert    = chai.assert;
var expect    = chai.expect;
var mongoose  = require('mongoose');
var sinon     = require('sinon');
require('sinon-mongoose');

/// Get the model
var T002 = require('../models/t002');

describe('t002 model', function () {
  var t002Mock = sinon.mock(new T002({ value: 12345.67}));
  var t002 = t002Mock.object;

  it('getValue', function () {

    console.log(t002Mock);
    console.log(t002);

    assert.equal(t002.getValue(), t002Mock.object.value);
  })
});
