var model = require("../../models/vipAdmin.js")
var async = require("async");

module.exports.Menu = function (request,response) {
  response.render('admin/vipMenu',response);
}

module.exports.AjoutForm = function (request,response) {
  async.parallel([
    function (callback) {
      model.getNats(function (err,result) {
        callback(null,result);
      })
    }
  ],function (err,result) {
    response.nats = result[0];
    response.render('admin/vipAjout',response);
  })

}

module.exports.AjoutBD = function (request,response) {
  var nom = request.body.nom;
  var prenom = request.body.prenom;
  var sexe = request.body.sexe;
  if(request.body.dateNaissance){
    var dateNaissance = "'"+ request.body.dateNaissance+"'";
  }else{
    var dateNaissance = "NULL";
  }
  var nationalite = request.body.nationalite;
  var commentaire = request.body.commentaire;
  var dateInsertion = request.body.dateInsertion;

  if(nom && prenom && dateInsertion){
    async.parallel([function (callback) {
      model.addVip(nom,prenom,sexe,dateNaissance,nationalite,commentaire,dateInsertion,function (err, result) {
        callback(null,result);
      })

    }],function (err,result) {
      response.added = true;
      response.render('admin/vipAjout',response);
    })
  }else{
    async.parallel([
      function (callback) {
        model.getNats(function (err,result) {
          callback(null,result);
        })
      }
    ],function (err,result) {
      response.nats = result[0];
      response.error = "Les noms, prénoms et date d'insertion doivent être saisis";
      response.render('admin/vipAjout',response);
    })
  }



}
