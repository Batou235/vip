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


module.exports.Article2 = function (request, response){

  model.getListeVip(request.params.num,function(err, result){
    try {
      response.vips = result;
    } catch (e) {

    } finally {
    }
});



  model.getArticle(request.params.num,function(err, result){
    try {
      response.article = result;
    } catch (e) {

    } finally {

    }
       response.render('article2',response);
});

};
