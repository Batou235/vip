
var model = require("../models/vip.js")

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';
   model.getFirstLetter(function(err,result){
     response.letters = result;
     response.render('repertoireVips', response);
   }


   );

};

module.exports.Letter = function(request,response){
  response.title = 'Répertoire des stars';
  model.getFirstLetter(function(err,result){
    response.letters = result;
  });
  model.getListStars(request.params.letter,function(err,result){
    response.list = result;
    console.log(result);
    response.render('vipsByLetters',response);
  });


};
