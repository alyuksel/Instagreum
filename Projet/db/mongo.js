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
