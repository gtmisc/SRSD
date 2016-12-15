/// For generating test data

var nasdaq = require('../models/nasdaq');

module.exports.genRecord = function(value, change, date) {
  return new nasdaq ({
    value: value,
    change: change,
    percentchange: change*100/value,
    date: date
  });
};
