var mongoose	= require('mongoose');

/// Define schema for NASDAQ Values
var t002Schema = new mongoose.Schema({
	value: Number,
	change: Number,
	percentchange: Number,
	date: {
		type: Date,
		default: Date.now
	}
});

// Export the model
module.exports = mongoose.model('T002', t002Schema);
