var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AAGramDB', {
  useMongoClient: true,
});
var persoSchema=mongoose.Schema({
  nom:{type:String},
  prenom:{type:String}
});
var Perso=mongoose.model('Perso',persoSchema);
var nouveauPerso=new Perso({
  nom:'Durand',
  prenom:'Pierre'
});
nouveauPerso.save(function(err){
  if (err){
    console.log("erreur d'écriture")
  }
  else{
    console.log("enregistrement effectué");}
  });
