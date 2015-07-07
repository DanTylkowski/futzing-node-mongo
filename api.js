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
}
