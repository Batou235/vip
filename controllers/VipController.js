
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

  model.getListStars('',request.params.num,function(err,result){
    response.list = result;

  });

  model.getDefileCouturier(request.params.num,function(err,result){
    try{
      response.list[0].defileCouturier = result;
    }catch(e){

    }

  });

  model.getDefileMannequin(request.params.num,function(err,result) {
    try {
      response.list[0].defileMannequin = result;
    } catch (e) {

    } finally {

    }

  })

  model.getAlbumChanteur(request.params.num,function(err,result){
    try {
      response.list[0].albumChanteur = result;
      response.list[0].chanteurSpecialite = result[0].chanteur_specialite;
    } catch (e) {

    } finally {

    }

  })

  model.getFilmsActeurs(request.params.num,function(err,result) {
    response.list[0].filmsActeurs = result;
    if(result.length > 0){
    if(result[0].film_titre != null)
    {
      response.list[0].afilms = true;
    }
    else{
      response.list[0].afilms = false;
    }

}
  })

  model.getFilmsRealisateurs(request.params.num,function(err,result){
    console.log(result);
    if (result.length > 0){
      response.list[0].filmsRealisateurs = result;
      if(result[0].film_titre != null){
        response.list[0].rfilms = true;
      }
      else{
        response.list[0].rfilms = false;
      }
    }

  })

  model.getMariage(request.params.num,function(err, result){
    try {
      nom = result[0].VIP_NOM;
      prenom = result[0].VIP_PRENOM;
      dateEvenement = result[0].DATE_EVENEMENT;
      lieuEvenement = result[0].MARIAGE_LIEU;
      mariageFin = result[0].MARIAGE_FIN;
      mariageMotifFin = result[0].MARIAGE_MOTIFFIN;

    } catch (e) {

    } finally {

    }


  });

model.getMariage(request.params.num,function(err, result){
    response.list[0].mariage = true;
    try {
      response.list[0].nomMari = result[0].VIP_NOM;
      response.list[0].prenomMari = result[0].VIP_PRENOM;
      response.list[0].dateEvenementMariage = result[0].DATE_EVENEMENT;
      response.list[0].lieuEvenement = result[0].MARIAGE_LIEU;
      response.list[0].mariageFin = result[0].MARIAGE_FIN;
      response.list[0].mariageMotifFin = result[0].MARIAGE_MOTIFFIN;
    } catch (e) {
      response.list[0].mariage = false;
    } finally {

    }
  });

  model.getLiaison(request.params.num,function(err, result){
    response.list[0].liaison = true;
    try {
      response.list[0].nomConcubin = result[0].VIP_NOM;
      response.list[0].prenomConcubin = result[0].VIP_PRENOM;
      response.list[0].dateEvenementLiaison = result[0].DATE_EVENEMENT;
      response.list[0].liaisonMotifFin = result[0].LIAISON_MOTIFFIN;
    } catch (e) {
      response.list[0].liaison = false;
    } finally {

    }
    response.render('detailVip',response);
  });


};
