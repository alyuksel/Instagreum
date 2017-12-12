var model = require('./db/mongo');
var User=model.mongoose.model('User',model.userSchema);

var express = require('express');
var bodyParser = require('body-parser');;

var app = express();
app.use('/js', express.static(__dirname + '/js'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/main.html');
});

app.post('/api/createUser', function(req,res) {
  if (!req.body) return res.sendStatus(400);
  var newUser=new User({
    username:req.body.username,
    name:req.body.name,
    firstname:req.body.firstname,
    birthdate:req.body.birthdate,
    password:req.body.password,
    mail:req.body.mail
  });
  newUser.save(function(err){
    if (err){
      res.send(newUser);
    }
    else{
      res.send('Done');
    }
  })
});

console.log("server start");
app.listen(9090);
