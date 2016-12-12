/// Get NASDAQ value

var request = require('request');

/// Make a POST request to NASDAQ.com
request({
	url: 'http://www.nasdaq.com',
	method: 'POST'
}, function(err, resp, body) {
	if (err) {
		console.log(err);
	}
	else {
		/// Extract '("NASDAQ" ... )'
    /// example: '("NASDAQ","5444.50","27.14","0.50","2,698,248,089","5450.16","5427.12")'
    /// then extract the values
    var begin = body.indexOf('("NASDAQ"');
    if (begin < 0) {
    	return;
    }
    var end = body.indexOf(')', begin)
    var s = body.substring(begin, end + 1);
    var vals = s.split('","');
    console.log(vals);

    /// Only the 2nd, 3rd, and 4th will be collected
    /// 2nd value is NASDAQ's value
    /// 3rd value is NASDAQ's changed value
    /// 4th value is NASDAQ's changed value in %
	}
});
