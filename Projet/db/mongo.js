
exports.mongoose = require('mongoose');
exports.mongoose.connect('mongodb://localhost/AAGramDB', {
  useMongoClient: true,
});
exports.userSchema=exports.mongoose.Schema({
  pseudo:{type:String},
  nom:{type:String},
  prenom:{type:String},
  age:{type:Number},
  avatar:{data:Buffer,contentType: String }
});
