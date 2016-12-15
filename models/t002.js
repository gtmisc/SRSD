var mongoose	= require('mongoose');

/// Define schema for NASDAQ Values
var t002Schema = new mongoose.Schema({
	value: { type: Number, required: true },
	change: { type: Number, required: true },
	percentchange: { type: Number, required: true },
	date: { type: Date, default: Date.now	}
});

t002Schema.method('getValue', function (cb) {
  if (!this.value && cb) {
    // cb('value is null or undefined!');
  }
  return this.value;
});

// Export model derived from schema
module.exports = mongoose.model('T002', t002Schema);
