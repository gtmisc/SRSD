/// Base Setup
var express			= require('express');
var bodyParser	= require('body-parser');
var exports = module.exports = {};
var app = express();
var port = 8000;
var intervalTimeToGetData = 10000;

/// Use MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/T001');
var T001 = require('./models/t001');	// the defined Nasdaq Value model

/// Do request Nasdaq Value
var reqNasdaqVal = require('./js/get-nasdaq.js');
setInterval(reqNasdaqVal, intervalTimeToGetData);


/// Use body-parser for getting data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/// Routes for API
var router = express.Router();

/// Router Middleware
router.use(function routerMWare(req, res, next) {
	console.log('Router Middleware');
	next();	// don't stop by moving to next route
});

/// Test route (accessed at GET http://localhost:8000/api)
router.get('/', function(req, res) {
	res.json({message: 'Welcome to Nasdaq Values'});
});

/// Routes for accessing NASDAQ Values
router.route('/T001')
	.post(function(req, res) {
		console.log('entering creating a T001');
		var t001 = new T001();
		t001.name = req.body.name;

		console.log(t001);

		/// Save the t001 and check for errors
		t001.save(function(err) {
			if (err) {
				res.send(err); 
			}
			else {
				res.json({message: 'T001 created!'});
			}
		});
	})

	.get(function(req, res) {
		T001.find(function(err, t001s) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(t001s);
			}
		});
	});

router.route('/T001_All')
	.get(function(req, res) {
		T001.find(function(err, t001s) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(t001s);
			}
		});
	});

router.route('/T001_Last')
	.get(function(req, res) {
		T001.find(function(err, t001s) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(t001s[t001s.length - 1]);
			}
		});
	});


/// All routes will be prefixed with /api
app.use('/api', router);


var server = app.listen(port, function() {
	console.log('Server is listening on port', port);
});

/// Start the server
exports.closeServer = function() {
	server.close();
};
