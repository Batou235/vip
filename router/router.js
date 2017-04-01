var HomeController = require('./../controllers/HomeController');
var VipController = require('./../controllers/VipController');
var AlbumController = require('./../controllers/AlbumController');
var ArticleController = require('./../controllers/ArticleController');



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:letter', VipController.Letter);
    app.get('/repertoire/vip/:num', VipController.Detail);

 // albums
   app.get('/album', AlbumController.ListerAlbum);
   app.get('/album/:num', AlbumController.ListerAlbum2);

 // article
 app.get('/articles', ArticleController.Article);
 app.get('/articles/:num', ArticleController.Article2);

 // tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);


};
