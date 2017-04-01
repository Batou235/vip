var model = require("../models/vip.js")
var async = require("async");

module.exports.Article = function (request, response){

  async.parallel([function (callback) {
    model.getListeVip(request.params.num,function(err, result){
      callback(null,result);

  });
  }],function (err,result) {
    response.vips = result[0];
    response.title = 'Articles';
    response.render('article',response);
  });

};


module.exports.Article2 = function (request, response){

  async.parallel([
    function (callback) {

      model.getListeVip(request.params.num,function(err, result){
        callback(null,result);
      });

  },function (callback) {

    model.getArticle(request.params.num,function(err, result){
      callback(null,result);

    });

  }],function (err,result) {
    response.vips = result[0];
    response.article = result[1];
    response.article.numVip = request.params.num;
    response.title = 'Articles';
    response.render('article2',response);
  });

};
