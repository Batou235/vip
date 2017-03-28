var HomeController = require('./../controllers/HomeController');
var VipController = require('./../controllers/VipController');
var AlbumController = require('./../controllers/AlbumController');
var TestController = require('./../controllers/TestController');
var ArticleController = require('./../controllers/ArticleController');



// Routes
module.exports = function(app){

  // tests à supprimer
    app.get('/test', TestController.Test);

// Main Routes
    app.get('/', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:letter', VipController.Letter);
    app.get('/repertoire/vip/:num', VipController.Detail);

 // albums
   app.get('/album', AlbumController.ListerAlbum);

 // article
 app.get('/articles', ArticleController.Article);
 app.get('/articles/:num', ArticleController.Article2);

 // tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);


};
