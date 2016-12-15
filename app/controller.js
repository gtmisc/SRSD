/// Controller for routes

module.exports = function(db) {
  /// GET all records
  var getAllRecords = function(req, res) {
    db.find(function(err, records) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(records);
      }
    });
  };

  /// GET the latest record
  var getLatestRecord = function(req, res) {
    db.find(function(err, records) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(records[records.length - 1]);
      }
    });
  }

  /// GET all records between two datetimes
  var getRecordsRange = function(req, res) {
    var fromDT  = !!req.query.from ? new Date(req.query.from) : new Date('1970');
    var toDT    = !!req.query.to   ? new Date(req.query.to)   : new Date();

    /// Find in database and check for errors
    db.find({
      date: {
        $gte: fromDT,
        $lte: toDT
      }
    }, function(err, records) {
      if (err) {
        res.send(err); 
      }
      else {
        res.json(records);
      }
    });
  };

  return {
    getAllRecords: getAllRecords,
    getLatestRecord: getLatestRecord,
    getRecordsRange: getRecordsRange
  };

};
