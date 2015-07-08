var restify = require('restify');
var mongoose = require('mongoose');
var server = restify.createServer({
	name: 'mongo-api'
});

server.listen( ( process.env.PORT || 5000 ), function() {
	console.log( '%s listening at %s', server.name, server.url );
});

var db = mongoose.connect( process.env.MONGO_URI );

var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var Thing = new Schema({
	thing1: {
		type: String,
		required: true,
		trim: true
	},
	anotherThing: {
		type: String,
		required: false,
		trim: true
	},
	finalThing: {
		type: String,
		required: false,
		trim: true
	}
});

var Thing = mongoose.model( 'Thing', Thing );

server
	.use( restify.fullResponse() )
	.use( restify.bodyParser() )
	.use( restify.queryParser() )
	.use( restify.jsonp() );

server.get(
	'/thing',
	function( req, res, next ) {
		Thing.find(
			{},
			function( error, things ) {
				res.send( things );
			}
		);
	}
);

server.post(
	'/thing',
	function( req, res, next ) {
		if( req.params.thing1 === undefined ) {
			console.log( req.params );
			console.log( req.params.thing1 );
			console.log( req.params.anotherThing );
			console.log( req.params.finalThing );
			return next( new restify.InvalidArgumentError( 'thing1 must be supplied' ) );
		}
		var thingData = {
			thing1: req.params.thing1,
			anotherThing: req.params.anotherThing,
			finalThing: req.params.finalThing
		};
		var thing = new Thing( thingData );
		thing.save(function( error, data ) {
			if( error ) {
				return next( new restify.InvalidArgumentError( JSON.stringify( error.errors ) ) );
			} else {
				res.json( data );
			}
			res.send( 201, thing );
		});
	}
);

server.get(
	'/thing/addthing',
	function( req, res, next ) {
		if( req.params.thing1 === undefined ) {
			console.log( req.params );
			console.log( req.params.thing1 );
			console.log( req.params.anotherThing );
			console.log( req.params.finalThing );
			return next( new restify.InvalidArgumentError( 'thing1 must be supplied' ) );
		}
		var thingData = {
			thing1: req.params.thing1,
			anotherThing: req.params.anotherThing,
			finalThing: req.params.finalThing
		};
		var thing = new Thing( thingData );
		thing.save(function( error, data ) {
			if( error ) {
				return next( new restify.InvalidArgumentError( JSON.stringify( error.errors ) ) );
			} else {
				res.json( data );
			}
			res.send( 201, thing );
		});
	}
);

//curl -i -X POST -d '{ "thing1": "hi", "anotherThing": "hello", "finalThing": "yo" } ' http://localhost:7000/thing
//curl -i -X POST -d 'thing1=hi&anotherThing=hello&finalThing=yo' http://localhost:7000/thing
//curl -i -X POST -d 'thing1=hey-ya&anotherThing=yup-yup&finalThing=champ' http://localhost:7000/thing

server.get(
	'/thing/bything',
	function( req, res, next ) {
		console.log( req.params );
		Thing.find(
			{
				thing1: req.params.thing1
			},
			function( error, thing ) {
				if( error ) {
					return next( new restify.InvalidArgumentError( JSON.stringify( error.errors ) ) );
				}

				if( thing ) {
					res.send( thing );
				} else {
					res.send( 404 );
				}
			}
		);
	}
);

