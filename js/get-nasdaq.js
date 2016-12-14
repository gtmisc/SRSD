/// Get NASDAQ value

var request = require('request');

function reqNasdaqVal(cb) {

  /// Make a POST request to NASDAQ.com
  request({
  	url: 'http://www.nasdaq.com',
  	method: 'POST'
  }, function(err, resp, body) {
  	if (err) {
  		console.error(err);
  	}
  	else {
      var nasdaqVals = extractNasdaqVals(body, Date.now());

      // Call the callback function with the retrieved values
      if (nasdaqVals && cb) {
        cb(nasdaqVals);
      }
  	}
  })

};

/// Extract '("NASDAQ" ... )'
/// example: '("NASDAQ","5444.50","27.14","0.50","2,698,248,089","5450.16","5427.12")'
function extractNasdaqVals (body, date) {
  var begin = body.indexOf('("NASDAQ"');

  if (begin < 0) {
    console.error('Couldn\'t find NASDAQ values');
    return;
  }

  var end = body.indexOf(')', begin)
  var s = body.substring(begin, end + 1);
  var vals = s.split('","');

  /// Only the 2nd, 3rd, and 4th will be collected
  // 2nd value is NASDAQ's value
  value = parseFloat(vals[1]);
  // 3rd value is NASDAQ's changed value
  change = parseFloat(vals[2]);
  // 4th value is NASDAQ's changed value in %
  percentchange = parseFloat(vals[3]);
  if (change < 0) {
    percentchange *= -1;
  }
  var nasdaqVals = {
    value,
    change,
    percentchange,
    date
  };

  return nasdaqVals;
}

reqNasdaqVal.extractNasdaqVals = extractNasdaqVals;

module.exports = reqNasdaqVal;
