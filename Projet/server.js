var model = require('./db/mongo');
var User=model.mongoose.model('User',model.userSchema);
var Img=model.mongoose.model('Img',model.imageSchema);
var Likes = model.mongoose.model('Likes',model.likeSchema);

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mime = require('mime');
var rawbody = require('raw-body');
var multer = require('multer');
var methodOverride = require('method-override');
const uuid = require('uuid/v1');
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
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/create/user', function(req,res) {
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
app.post('/api/register/image/:u', upload.single('img'), function(req,res){
  var user = req.params.u;
  var img = req.file;
  var nImg = new Img();
  nImg.username = user;
  nImg.id = uuid();
  console.log(img);
  nImg.img.data = fs.readFileSync(img.path);
  nImg.img.contentType = img.mimetype;
  nImg.like = 0;
  nImg.publicationDate = new Date();
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
app.get('/api/image/:u', function(req,res){
  var u = req.params.u;
  var img = Img.find({username:u}).exec(function(err,doc){
    if(doc){
      console.log(doc);
      res.send(doc);
    }else{
      res.status(504).send("error");
    }
  })
});
app.get('/api/register/:u',function(req,res){
  var u = req.params.u;
  var user = User.findOne({username:u}).select('username').exec(function (err, doc){
    if(doc){
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

app.get('/api/images',function(req,res){
  var imgs = Img.find().exec(function(err,doc){
    if(doc) res.send(doc);
    else res.status(404).send('not found');
  });
});

app.get('/api/images/delete/:id', function(req,res){
  var i = req.params.id;
  var user  = Img.find({id:i}).remove().exec(function(err,doc){
    if(doc){
      res.send('deleted');
    }
    else{
      res.status(204).send('error');
    }
  });

});

app.get('/api/images/like/:u', function(req,res){
  var user = req.params.u;
  var like  = Likes.find({username:user}).select('photoId').exec(function(err,doc){
    if(doc){
      res.send(doc);
    }
    else{
      res.send('error');
    }
  });
});

app.post('/api/images/like/:u/:id', function(req,res){
  var user = req.params.u;
  var id = req.params.id;
  var nLike = new Likes();
  nLike.username = user;
  nLike.photoId = id;
  nLike.save (function(err){
    if(err){
      res.send("error")
    }else{
      res.send(nLike);
    }
  })
});

console.log("server start");
app.listen(9090);
