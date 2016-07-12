var express = require('express');
var utils = require('./server/utilities.js');

var app = express();

app.use(express.static(__dirname + '/client'));

app.get('/new', function(req, res) {
  res.send(utils.makeNewBoard(30));
});

var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);