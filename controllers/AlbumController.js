var model = require("../models/vip.js")
var async = require("async");
// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
  async.parallel([function (callback) {

    model.getListeVip(request.params.num,function(err, result){

      callback(null,result);

   })

  }],function (err,result) {
    response.vips = result[0];
    for (i = 0; ((i < response.vips.length)); i++ ) {
      response.vips[i].i = i % 4;
    }
    response.title = 'Album des stars';
    response.render('listerAlbum', response);
  });



 }

module.exports.ListerAlbum2 = function(request,response) {

  async.parallel([function(callback) {

      model.getListeVip(request.params.num,function(err, result){
          callback(null,result)
      })



  },
    function (callback) {
        model.getListStars('',request.params.num,function (err,result) {
            callback(null,result)
      })


    }
  ],function (err,result) {
    //Traitement du tableau
    response.vips = result[0];
    for (i = 0; ((i < response.vips.length)); i++ ) {

    response.vips[i].i = i % 4;

    }

    //Traitement de l'album du vip
    response.photos = result[1];
    response.nom = result[1][0].VIP_NOM;
    response.prenom = result[1][0].VIP_PRENOM;

    response.title = 'Album de ' + response.prenom + ' '+ response.nom;
    response.render('listerAlbum2', response);
  });

}
