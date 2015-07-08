var restify = require( 'restify' );
var server = restify.createServer();
server.use( restify.bodyParser() );

var mongoose = require( 'mongoose/' );
db = mongoose.connect( process.env.MONGO_URI );
Schema = mongoose.Schema;

// Create a schema for our data
var TestSchema = new Schema({
	date: Date,
	test: String,
	working: String
});

// Use the schema to register a model with MongoDb
mongoose.model( 'Test', TestSchema );
var Message = mongoose.model( 'Test' );

function getMessages( req, res, next ) {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Headers', 'X-Requested-With' );
	Message.find()
		.sort('date', -1)
		.execFind(
			function( arr, data ) {
				res.send( data );
			}
		);
}

function postMessage( req, res, next ) {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Headers', 'X-Requested-With' );
	var message = new Message();
	message.message = req.params.message;
	message.date = new Date();
	message.save(function() {
		res.send( req.body );
	});
}

server.get( '/messages', getMessages );
server.post( '/messages', postMessage );
