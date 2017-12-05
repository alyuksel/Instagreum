var express = require('express');
var app = express();
app.use('/js', express.static(__dirname + '/js'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/lib', express.static(__dirname + '/lib'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/main.html');
});
console.log("server start");
app.listen(9090);
