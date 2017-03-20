var model = require("../models/vip.js")

module.exports.Article = function (request, response){

  model.getListeVip(request.params.num,function(err, result){
    try {
      response.vips = result;
    } catch (e) {

    } finally {

    }
    response.render('article',response);   
});

};







