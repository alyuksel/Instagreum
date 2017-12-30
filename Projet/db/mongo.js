
exports.mongoose = require('mongoose');
exports.mongoose.connect('mongodb://localhost/Test', {
  useMongoClient: true,
});
exports.userSchema=exports.mongoose.Schema({
  username:{type:String},
  name:{type:String},
  firstname:{type:String},
  birthdate:{type:String},
  password:{type:String},
  mail:{type:String}
  //avatar:{data:Buffer,contentType: String }
});

exports.imageSchema=exports.mongoose.Schema({
  username:{type:String},
  id:{type:String},
  img:{data: Buffer, contentType: String},
  publicationDate:{type:Date},
  like:{type:Number},
  commentaire:{type:String}
});

exports.likeSchema=exports.mongoose.Schema({
  username:{type:String},
  photoId:{type:String}
});

exports.commentsSchema = exports.mongoose.Schema({
  username:{type:String},
  photoId:{type:String},
  comment:{type:String}
});
