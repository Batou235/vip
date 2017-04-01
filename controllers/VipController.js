var async = require("async");
var model = require("../models/vip.js")

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
  async.parallel([
    function (callback) {
      model.getFirstLetter(function(err,result){
        callback(null,result);
      })
    }
  ],function (err,result) {
    response.title = 'Répertoire des stars';
    response.letters = result[0];
    response.render('repertoireVips', response);
  });

};

module.exports.Letter = function(request,response){

  async.parallel([
    function (callback) {
      model.getFirstLetter(function(err,result){
        callback(null,result);
      });
    },function (callback) {
      model.getListStars(request.params.letter,0,function(err,result){
        callback(null,result);
      });
    }

  ],

  function (err,result) {
    response.title = 'Répertoire des stars';
    response.letters = result[0]; //Récupération de la première lettre de chaque vip
    response.list = result[1]; //Récupération des vips ayant la première lettre
    response.render('vipsByLetters',response);
  })

};

module.exports.Detail = function(request,response){

  async.parallel([
    function (callback) {
      model.getFirstLetter(function(err,result){
        callback(null,result);
      });
    },function (callback) {
      model.getListStars('',request.params.num,function(err,result){
        callback(null,result);
      });
    },function (callback) {
      model.getDefileCouturier(request.params.num,function(err,result){
        callback(null,result);
      });
    },function (callback) {
      model.getDefileMannequin(request.params.num,function(err,result) {
        callback(null,result);
      })
    },function (callback) {
      model.getAlbumChanteur(request.params.num,function(err,result){
        callback(null,result);
      })
    },function (callback) {
      model.getFilmsActeurs(request.params.num,function(err,result) {
        callback(null,result);
      });
    },function (callback) {
      model.getFilmsRealisateurs(request.params.num,function(err,result){
        callback(null,result);
      })
    },function (callback) {
      model.getMariage(request.params.num,function(err, result){
        callback(null,result);
      });
    },function (callback) {
        model.getLiaison(request.params.num,function(err, result){
          callback(null,result)
        });

    }
  ],function (err,result) {
    response.title = 'Répertoire des stars';
    response.letters = result[0];//Récupération de la première lettre de chaque vip

    response.list = result[1];//Récupération des vips ayant la première lettre

    response.list[0].defileCouturier = result[2];//Récupération des couturiers

    response.list[0].defileMannequin = result[3];//Récupération des mannequins

    try {//Récupération des chanteurs
      response.list[0].albumChanteur = result[4];
      response.list[0].chanteurSpecialite = result[4][0].chanteur_specialite;
    } catch (e) {

    }


    response.list[0].filmsActeurs = result[5];//Récupération des acteurs et de leurs films
    if(result[5].length > 0){
      if(result[5][0].film_titre != null)
      {
        response.list[0].afilms = true;
      }
      else{
        response.list[0].afilms = false;
      }
    }

    if (result[6].length > 0){//Récupération des réalisateurs et de leurs films
      response.list[0].filmsRealisateurs = result[6];
      if(result[6][0].film_titre != null){
        response.list[0].rfilms = true;
      }
      else{
        response.list[0].rfilms = false;
      }
    }

    response.list[0].mariage = true;//Récupération des mariages
    try {
      response.list[0].numMari = result[7][0].mari;
      response.list[0].nomMari = result[7][0].VIP_NOM;
      response.list[0].prenomMari = result[7][0].VIP_PRENOM;
      response.list[0].dateEvenementMariage = result[7][0].DATE_EVENEMENT;
      response.list[0].lieuEvenement = result[7][0].MARIAGE_LIEU;
      response.list[0].mariageFin = result[7][0].MARIAGE_FIN;
      response.list[0].mariageMotifFin = result[7][0].MARIAGE_MOTIFFIN;
    } catch (e) {
      response.list[0].mariage = false;
    }

    response.list[0].liaison = true;//Récupération des liaisons
    try {
      response.list[0].numConcubin = result[8][0].concubin
      response.list[0].nomConcubin = result[8][0].VIP_NOM;
      response.list[0].prenomConcubin = result[8][0].VIP_PRENOM;
      response.list[0].dateEvenementLiaison = result[8][0].DATE_EVENEMENT;
      response.list[0].liaisonMotifFin = result[8][0].LIAISON_MOTIFFIN;
    } catch (e) {
      response.list[0].liaison = false;
    }

    response.render('detailVip',response);

  });


};
