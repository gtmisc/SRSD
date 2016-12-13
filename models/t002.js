var mongoose	= require('mongoose');

var t002Schema = new mongoose.Schema({
	value: Number,
	change: Number,
	percentchange: Number,
	date: Number 
});

module.exports = mongoose.model('T002', t002Schema);
