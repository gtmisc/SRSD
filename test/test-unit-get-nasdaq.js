/// Test for ./js/get-nasdaq.js

var chai      = require('chai');
var assert    = chai.assert;
var expect    = chai.expect;
var mongoose  = require('mongoose');
var sinon     = require('sinon');
require('sinon-mongoose');

///
var reqNasdaqVal = require('../js/get-nasdaq');

describe('Scrape NASDAQ.com', function () {
  it('Fail to extract NASDAQ values', function() {
    var vals = reqNasdaqVal.extractNasdaqVals('test');
    expect(vals).to.be.a('undefined');
  });

  it('Succeed in extract NASDAQ values', function() {
    var body = 'nasdaqHomeIndexChart.storeIndexInfo("NASDAQ","5425.98","-18.52","0.34","353,700,283","5434.90","5414.69");'
    var date = Date.now();
    var vals = reqNasdaqVal.extractNasdaqVals(body, date);
    expect(vals).to.be.a('object');
    expect(vals.value).to.equal(5425.98);
    expect(vals.change).to.equal(-18.52);
    expect(vals.percentchange).to.equal(-0.34);
    expect(vals.date).to.equal(date);
  });
});
