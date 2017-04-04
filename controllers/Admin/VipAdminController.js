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

  for(var i = 0; i < commentaire.length; i++){
    console.log(i + " " + commentaire.length)
    if(commentaire[i] == '"'){
      commentaire = commentaire.substring(0,i)+'\\"'+commentaire.substring(i+1,commentaire.length)
      i++;
    }
  }

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

module.exports.ModifList = function (request, response) {
  async.parallel([
    function (callback) {
      model.listVip(function (err,result) {
        callback(null,result);
      })
    }
  ],function (err,result) {
    response.vips = result[0];
    response.render('admin/vipModifList',response);
  });
}

module.exports.ModifForm = function (request,response) {
  async.parallel([
    function (callback) {
      model.getNats(function (err,result) {
        callback(null,result);
      })
    },function (callback) {
      model.infoVip(request.params.num,function (err,result) {
        callback(null,result);
      })
    }
  ],
    function (err,result) {
      response.nats = result[0];
      response.vip = result[1][0];
      response.vip.VIP_NAISSANCE = response.vip.VIP_NAISSANCE.toISOString().substring(0, 10);
      response.vip.VIP_DATE_INSERTION = response.vip.VIP_DATE_INSERTION.toISOString().substring(0, 10);
      for(var i = 0; i < response.nats.length; i++){
        if(response.nats[i].NATIONALITE_NUMERO == response.vip.NATIONALITE_NUMERO){
          response.nats[i].selected = true;
        }
      }
      response.render('admin/vipModif',response);
  })
}

module.exports.ModifBD = function (request, response) {
  var num = request.params.num;
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

  for(var i = 0; i < commentaire.length; i++){
    console.log(i + " " + commentaire.length)
    if(commentaire[i] == '"'){
      commentaire = commentaire.substring(0,i)+'\\"'+commentaire.substring(i+1,commentaire.length)
      i++;
    }
  }

  if(nom && prenom && dateInsertion){
    async.parallel([function (callback) {
      model.modifVip(num,nom,prenom,sexe,dateNaissance,nationalite,commentaire,dateInsertion,function (err, result) {
        callback(null,result);
      })

    }],function (err,result) {
      response.changed = true;
      response.render('admin/vipModif',response);
    })
  }else{
    async.parallel([
      function (callback) {
        model.getNats(function (err,result) {
          callback(null,result);
        })
      },function (err,result) {
        model.infoVip(request.params.num,function (err,result) {
          callback(null,result);
        })
      }
    ],function (err,result) {
      response.nats = result[0];
      response.vip = result[1][0];
      response.vip.VIP_NAISSANCE = response.vip.VIP_NAISSANCE.toISOString().substring(0, 10);
      response.vip.VIP_DATE_INSERTION = response.vip.VIP_DATE_INSERTION.toISOString().substring(0, 10);
      for(var i = 0; i < response.nats.length; i++){
        if(response.nats[i].NATIONALITE_NUMERO == response.vip.NATIONALITE_NUMERO){
          response.nats[i].selected = true;
        }
      }
      response.render('admin/vipModif',response);
    })
  }
}

module.exports.SupprList = function (request, response) {
  async.parallel([
    function (callback) {
      model.listVip(function (err,result) {
        callback(null,result);
      })
    }
  ],function (err,result) {
    response.vips = result[0];
    response.render('admin/vipSupprList',response);
  });
}

module.exports.SupprBD = function (request, response) {
  async.parallel([function (callback) {
    model.suppVip(request.params.num,function (err,result) {
      callback(null,result);
    })
  }],
    function (err, result) {
      response.removed = true;
      response.render('admin/vipSupprList',response);
  })
}
