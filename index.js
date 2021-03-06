var express = require( 'express' );
var app = express();

var mongoDB = require( 'mongodb' );

app.set( 'port', ( process.env.PORT || 5000 ) );

app.listen(
	app.get( 'port' ),
	function() {
		console.log( "Node app is running on port:" + app.get( 'port' ) );
	}
);

var testCollection = [
	{
		index: 1,
		test: 'yup',
		working: 'uh-huh'
	},
	{
		index: 2,
		test: 'all right',
		working: 'nope'
	},
	{
		index: 3,
		test: 'yes',
		working: 'uh-huh'
	}
];

mongoDB.MongoClient.connect(
	process.env.MONGO_URI,
	function( err, db ) {
  		if( err ) {
  			throw err;
  		}
		var collection = db.collection( 'test' );
		collection.insert(
			testCollection,
			function( err, result ) {
		  		if( err ) {
		  			throw err;
		  		}
				console.log( 'data sent' );
				collection.find(
					{
						working: {
							$gte: 'uh-huh'
						}
					}
				)
					.sort({
						index: 1
					})
					.toArray(function( err, docs ){
				  		if( err ) {
				  			throw err;
				  		}
				  		var html = '';
				  		docs.forEach(function( doc ) {
				  			html += 'index = ' + doc.index + '<br/>';
				  			html += 'working = ' + doc.working + '<br/>';
				  			html += 'test = ' + doc.test + '<br/>';
				  			html += '_______________<br/>';
				  		});
						app.get(
							'/',
							function(request, response) {
								response.send( html );
							}
						);
				  		collection.drop();
					});
			}
		);
	}
);



