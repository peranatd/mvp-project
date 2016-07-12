var express = require('express');

var app = express();


app.use(express.static(__dirname + '/client'));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});


var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);