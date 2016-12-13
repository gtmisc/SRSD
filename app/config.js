var config = {
	port: process.env.PORT || 8000,
	test_port: 8001,
	db: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/T002',
	test_db: 'mongodb://localhost:27017/T002_test',
	intervalTimeToGetData: 6000
}
module.exports = config;
