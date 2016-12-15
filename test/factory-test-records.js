/// For generating test data

var T002 = require('../models/t002');

module.exports.genRecord = function(value, change, date) {
  return new T002 ({
    value: value,
    change: change,
    percentchange: change*100/value,
    date: date
  });
};
