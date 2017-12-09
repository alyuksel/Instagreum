var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AAGramDB', {
  useMongoClient: true,
});
var userSchema=mongoose.Schema({
  pseudo:{type:String},
  nom:{type:String},
  prenom:{type:String},
  age:{type:Number},
  avatar:{data:Buffer,contentType: String }
});
var User=mongoose.model('User',userSchema);

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

app.post('/api/addUser', function(req,res) {
  if (!req.body) return res.sendStatus(400);
  var newUser=new User({
    pseudo:req.body.pseudo,
    nom:req.body.nom,
    prenom:req.body.prenom,
    age:req.body.age,
    avatar:req.body.avatar
  });
  newUser.save(function(err){
    if (err){
      res.send('err');
    }
    else{
      res.send('Done');
    }
  })
});

console.log("server start");
app.listen(9090);
