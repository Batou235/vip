var model = require("../../models/vipAdmin.js")
var async = require("async");
var crypto = require('crypto');

module.exports.Auth = function (request,response) {

  if(request.session.connected){
    response.render('admin/vipMenu',response);
  }else{
    response.render('admin/auth',response);
  }

}

module.exports.Connect = function (request,response) {
  async.parallel([function (callback) {

    model.getUsers(function(err, result){

      callback(null,result);

   });

  }],

  function (err,result) {

    for(var i = 0; i < result[0].length; i++){
      user = result[0][i];
      if(user.LOGIN == request.body.login){
        if(user.PASSWD == crypto.createHash('sha256').update(request.body.passwd).digest('hex')){
          request.session.connected = true;
          response.render('admin/vipMenu',response);
        }
        else{
          response.error = 'Mot de passe incorrect';
          response.render('admin/auth',response);
        }
      }else{
        response.error = 'Identifiant incorrect';
        response.render('admin/auth',response);
      }
    }

  });


}
