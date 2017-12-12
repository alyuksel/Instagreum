
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
  // avatar:{data:Buffer,contentType: String }
});
