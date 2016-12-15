var config = {
	port: process.env.PORT || 8000,
	test_port: 8001,
	db: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nasdaq',
  // db: process.env.MONGOLAB_URI || 'mongodb://usra:usra1@ds127968.mlab.com:27968/atp',
	test_db: 'mongodb://localhost:27017/nasdaq_test',
	intervalTimeToGetData: 30000
}
module.exports = config;
