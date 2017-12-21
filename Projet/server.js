var model = require('./db/mongo');
var User=model.mongoose.model('User',model.userSchema);
var Img=model.mongoose.model('Img',model.imageSchema);
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mime = require('mime');
var rawbody = require('raw-body');
var multer = require('multer');
var methodOverride = require('method-override');
var app = express();


var upload =multer({ dest: './uploads/'});
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.json());
app.use('/js', express.static(__dirname + '/js'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use(bodyParser.urlencoded({ limit : '50mb',extended: true,parameterLimit: 1000000 }));
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
app.post('/api/registerImage/:u', upload.single('img'), function(req,res){
  var user = req.params.u;
  var img = req.file;
  var nImg = new Img();
  nImg.username = user;
  console.log(img);
  nImg.img.data = fs.readFileSync(img.path);
  nImg.img.contentType = img.mimetype;
  nImg.save(function(err){
    if (err){
      res.send(nImg);
    }
    else{
      fs.unlink(img.path);
      res.send("Done");
    }
  });
});
app.get('/api/getImage/:u', function(req,res){
  var u = req.params.u;
  var img = Img.findOne({username:u}).exec(function(err,doc){
    if(doc){
      res.send(doc);
    }else{
      res.status(504).send("error");
    }
  })
});
app.get('/api/register/:u',function(req,res){
  var u = req.params.u;
  var user = User.findOne({username:u}).select('username').exec(function (err, doc){
    if(user){
      res.send(doc);
    }else{
      res.send();
    }

  });
});
app.get('/api/login/:u',function(req,res){
  var u = req.params.u;
  var user = User.findOne({username:u}).select('password').exec(function (err, doc){
    if(doc){
      res.send(doc);
    }else{
      res.status(204).send("missing user");
    }
  });
});


console.log("server start");
app.listen(9090);
