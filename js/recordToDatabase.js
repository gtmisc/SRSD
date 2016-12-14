/// Record to Database

function recordToDatabase(vals, dbModel) {
	if (!dbModel) return;

	var dbObj = new dbModel();
	dbObj.value = vals.value;
	dbObj.change = vals.change;
	dbObj.percentchange = vals.percentchange;
	dbObj.date = vals.date;

	/// Save the dbObj and check for errors
	dbObj.save(function(err, dbObj) {
		if (err) {
			console.error(err); 
		}
		else {
			console.log({message: dbObj + ' saved to database!'});
		}
	});

};

module.exports = recordToDatabase;
