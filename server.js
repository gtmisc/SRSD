/// Base Setup
var express			= require('express');
var bodyParser	= require('body-parser');
var morgan			= require('morgan');

var config			= require('./app/config');

/// Use MongoDB
var mongoose = require('mongoose');
var T002 = require('./models/t002');	// the defined Nasdaq Value model

var app = express();
var controller	= require('./app/controller')(T002);


/// Do request Nasdaq Value
var reqNasdaqVal = require('./js/get-nasdaq.js');

/// Do record to database
var recToDatabase = require('./js/recordToDatabase');

function recordVal(cb) {
	reqNasdaqVal(cb);
}

/// Callback function that is called after recordVal function is finished.
/// This function will call the function to record the value to database.
function cb(vals) {
	// Needs database obj (vals) and database model (T002)
	recToDatabase(vals, T002)
}

/// Use body-parser for getting data from a POST
app.use(bodyParser.urlencoded({extended: true}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());												// parse application/json

var router = express.Router();	// routes for API
app.use('/api', router);				// all routes will be prefixed with /api

/// Router Middleware
router.use(function routerMWare(req, res, next) {
	next();	// don't stop by moving to next route
});

/// Test route (accessed at GET http://localhost:8000/api)
router.get('/', function(req, res) {
	res.json({message: 'Welcome to Nasdaq Values'});
});


///============================================================================
/// START: Routes for accessing NASDAQ Values
///----------------------------------------------------------------------------

/// GET all records
router.route('/T002/all').get(controller.getAllRecords);

/// GET the latest values
router.route('/T002/latest').get(controller.getLatestRecord);

/// GET all records between two datetimes
router.route('/T002/daterange').get(controller.getRecordsRange);

///----------------------------------------------------------------------------
/// END: Routes for accessing NASDAQ Values
///============================================================================

/// Set port and database to connect
var dbc, port;
if (process.env.NODE_ENV === 'test') {
	dbc = config.test_db;
	port = config.test_port;
}
else {
	app.use(morgan('dev'));		// log every request to the console
	dbc = config.db;
	port = config.port;

}

/// Connect to database
mongoose.connect(dbc);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));
db.on('connected', function() {
	console.log('Mongoose default connection is open to', dbc);
});
db.once('open', function() {
	console.log('The database is connected');

	/// Retrieve and store NASDAQ values to database periodically
	setInterval(function() {
		recordVal(cb);
	}, config.intervalTimeToGetData);
});

/// Start server
app.listen(port, function(err) {
	if (err) {
		console.error(err);
	}
	else {
		console.log('Server is listening on port', port);
	}
});

// Export server
module.exports = app;
