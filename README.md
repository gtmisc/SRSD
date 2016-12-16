# SRSD
SRSD (Search Record Serve Data) is a Node.js application that serves NASDAQ values scraped from www.nasdaq.com periodically.
The database is MongoDB which can be a local (see [Install MongoDB](https://docs.mongodb.com/manual/installation/)) or the remote one.  The setting is located in [./app/config.js](https://github.com/gtmisc/SRSD/blob/master/app/config.js).
The remote database is served by [mLab](https://mlab.com/home).

### Install: npm install

### Run: node server.js

### Run automated test: npm test
(**npm test** requires mocha that is installed globally.)

*Since update to the records are not allowed, all available RESTful APIs are GET.*

### Usage:
* **http://localhost:8000/api/**
  * returns
  * {"message":"Welcome to Nasdaq Values"}

* **http://localhost:8000/api/nasdaq/all**
  * returns all records

* **http://localhost:8000/api/nasdaq/latest**
  * returns the latest or last record
  * example: {"_id":"5853acbaeda7472e94ff2f41","percentchange":0.37,"change":20.18,"value":5456.85,"__v":0,"date":"2016-12-16T08:58:34.075Z"}

* **http://localhost:8000/api/nasdaq/daterange/?from=2016-12-15T14:00:00&to=2016-12-15T14:05:00**
  * returns records created between the date range
  * example:
[
  {"_id":"5852a2a7ae6338d4b8d4d43a","percentchange":-0.5,"change":-27.16,"value":5436.67,"__v":0,"date":"2016-12-15T14:03:19.509Z"},
  {"_id":"5852a2c5ae6338d4b8d4d43b","percentchange":-0.5,"change":-27.16,"value":5436.67,"__v":0,"date":"2016-12-15T14:03:49.029Z"},
  {"_id":"5852a2e3ae6338d4b8d4d43c","percentchange":-0.5,"change":-27.16,"value":5436.67,"__v":0,"date":"2016-12-15T14:04:19.128Z"},
  {"_id":"5852a300ae6338d4b8d4d43d","percentchange":-0.5,"change":-27.16,"value":5436.67,"__v":0,"date":"2016-12-15T14:04:48.957Z"}
 ]
 
 
