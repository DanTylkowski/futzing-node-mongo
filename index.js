var express = require('express');
var app = express();

app.set('port', 5001);

app.get('/', function(request, response) {
  response.send( 'hi' );
});
app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'));
});
