/// Record to Database

function recordToDatabase(vals, dbModel) {
	if (!dbModel) return;

	console.log('save to database:', vals);

	var dbObj = new dbModel();
	dbObj.value = vals.value;
	dbObj.change = vals.change;
	dbObj.percentchange = vals.percentchange;
	dbObj.date = vals.date;

	/// Save the dbObj and check for errors
	dbObj.save(function(err) {
		if (err) {
			console.log(err); 
		}
		else {
			console.log({message: 'dbObj created!'});
		}
	});

};

module.exports = recordToDatabase;
