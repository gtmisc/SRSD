/// Base Setup
var express			= require('express');
var bodyParser	= require('body-parser');
var morgan			= require('morgan');

var config = require('./app/config');

/// Use MongoDB
var mongoose = require('mongoose');
var T002 = require('./models/t002');	// the defined Nasdaq Value model

var app = express();

/// Do request Nasdaq Value
var reqNasdaqVal = require('./js/get-nasdaq.js');

function recordToDatabase(vals) {
	console.log('save to database:', vals);

	var t002 = new T002();
	t002.value = vals.value;
	t002.change = vals.change;
	t002.percentchange = vals.percentchange;
	t002.date = vals.date;

	/// Save the t002 and check for errors
	t002.save(function(err) {
		if (err) {
			console.log(err); 
		}
		else {
			console.log({message: 'T002 created!'});
		}
	});

};

function recordVal(cb) {
	reqNasdaqVal(cb);
}

setInterval(function() {
	recordVal(recordToDatabase);
}, config.intervalTimeToGetData);


/// Use body-parser for getting data from a POST
app.use(bodyParser.urlencoded({extended: true}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());												// parse application/json


/// Routes for API
var router = express.Router();

/// Router Middleware
router.use(function routerMWare(req, res, next) {
	next();	// don't stop by moving to next route
});

/// Test route (accessed at GET http://localhost:8000/api)
router.get('/', function(req, res) {
	res.json({message: 'Welcome to Nasdaq Values'});
});

/// Routes for accessing NASDAQ Values
router.route('/T002')
	.post(function(req, res) {
		console.log('entering creating a T002');
		var t002 = new T002();
		t002.value = req.body.value;
		t002.change = req.body.change;
		t002.percentchange = req.body.percentchange;
		if (t002.change < 0) {
			t002.percentchange *= -1;
		}

		console.log(t002);

		/// Save the t002 and check for errors
		t002.save(function(err) {
			if (err) {
				res.send(err); 
			}
			else {
				res.json({message: 'T002 created!'});
			}
		});
	})

	.get(function(req, res) {
		T002.find(function(err, t002s) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(t002s);
			}
		});
	});

router.route('/T002/all')
	.get(function(req, res) {
		T002.find(function(err, t002s) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(t002s);
			}
		});
	});

router.route('/T002/latest')
	.get(function(req, res) {
		T002.find(function(err, t002s) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(t002s[t002s.length - 1]);
			}
		});
	});


/// All routes will be prefixed with /api
app.use('/api', router);

/// Set database and start the server
var db, port;
if (process.env.NODE_ENV === 'test') {
	db = mongoose.connect(config.test_db);
	port = config.test_port;
}
else {
	app.use(morgan('dev'));		// log every request to the console
	db = mongoose.connect(config.db);
	port = config.port;

	// Check database connection
	mongoose.connection.on('connected', function() {
		console.log('Mongoose default connection is open to', (process.env.NODE_ENV === 'test' ? config.test_db : config.db));
	});
}
app.listen(port, function(err) {
	if (err) console.log(err);
	console.log('Server is listening on port', port);
});

// Export server
module.exports = app;
