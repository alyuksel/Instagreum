var model = require('./db/mongo');

var User=model.mongoose.model('User',model.userSchema);
var Img=model.mongoose.model('Img',model.imageSchema);
var Likes = model.mongoose.model('Likes',model.likeSchema);
var Comments = model.mongoose.model('Comments',model.commentsSchema);

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
  nImg.commentaire = '';
  nImg.publicationDate = new Date();
  nImg.save(function(err){
    if (err){
      res.send(nImg);
    }
    else{
      fs.unlink(img.path);
      res.send(nImg);
    }
  });
});

app.put('/api/images/comment/:id', function(req,res){
  var imgId = req.params.id;
  var comment = req.body.comment;
  var img = Img.find({id:imgId}).exec(function(err,doc){
    if(doc){
      doc.forEach(function(image) {
        image.commentaire = comment;
          image.save(function(err){
            if (err){
              res.status(504).send("Error updating comment");
            }
            else{
              res.status(200).send(image);
            }
          });
      });
    }else{
      res.status(504).send("File not found");
    }
  });
});

app.get('/api/image/:u', function(req,res){
  var u = req.params.u;
  var img = Img.find({username:u}).exec(function(err,doc){
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
  var img  = Img.find({id:i}).remove().exec(function(err,doc){
    if(doc){
      res.status(200).send('deleted');
    }
    else{
      res.status(500).send('error');
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

app.put('/api/images/likes/add/:id/:u', function(req,res){
  var user = req.params.u;
  var id = req.params.id;
  var nLike = new Likes();
  nLike.username = user;
  nLike.photoId = id;
  nLike.save (function(err){
    if(err){
      res.status(500).send("Error while adding like in Like schema");
    }else{
        var photo = Img.findOne({id:id}).exec(function(err,doc){
          if(err) res.status(500).send("Image not found");
          else{
            doc.like = doc.like + 1;
            doc.save();
            res.status(200).send(doc);
          }
      });
    }
  });
});

app.post('/api/images/comments',function(req,res){
  if(!req.body){
    res.status(204).send("no data");
  }else{
    var nCom = new Comments();
    nCom.username = req.body.username;
    nCom.photoId = req.body.id;
    nCom.comment = req.body.comment;
    nCom.save();
    res.send("OK");
  }
});

app.get('/api/images/comments',function(req,res){
   var coms = Comments.find().exec(function(err,doc){
     if(doc){
       res.send(doc);
     }
   });
});

console.log("server start");
app.listen(9090);
