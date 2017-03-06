
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
  model.getListStars(request.params.letter,0,function(err,result){
    response.list = result;
    response.render('vipsByLetters',response);
  });


};

module.exports.Detail = function(request,response){
  response.title = 'Répertoire des stars';

  model.getFirstLetter(function(err,result){
    response.letters = result;
  });

  model.getCouturier(request.params.num,function(err,result){
    for(var i in result){
      couturier = true;
    }
  });

  model.getListStars('',request.params.num,function(err,result){
    response.list = result;
    response.list[0].couturier = true;
    response.render('detailVip',response);
  });

  model.getMariage(request.params.num,function(err, result){
    try {
      nom = result[0].VIP_NOM;
      prenom = result[0].VIP_PRENOM;
      dateEvenement = result[0].DATE_EVENEMENT;
      lieuEvenement = result[0].MARIAGE_LIEU;
      mariageFin = result[0].MARIAGE_FIN;
      mariageMotifFin = result[0].MARIAGE_MOTIFFIN;



      console.log(nom);
      console.log(prenom);
      console.log(mariageFin);
      console.log(mariageMotifFin);
      console.log(dateEvenement);
      console.log(lieuEvenement);
    } catch (e) {

    } finally {

    }
  });



};
