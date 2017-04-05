var AuthController = require('./../controllers/Admin/AuthController');
var PhotoAdminController = require('./../controllers/Admin/PhotoAdminController');
var VipAdminController = require('./../controllers/Admin/VipAdminController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', AuthController.Auth);
    app.post('/', AuthController.Connect);

    app.get('/admin/vip', VipAdminController.Menu);
    app.get('/admin/vip/ajout', VipAdminController.AjoutForm);
    app.post('/admin/vip/ajout',VipAdminController.AjoutBD);

    app.get('/admin/vip/modif', VipAdminController.ModifList);
    app.get('/admin/vip/modif/:num', VipAdminController.ModifForm);
    app.post('/admin/vip/modif/:num', VipAdminController.ModifBD);

    app.get('/admin/vip/suppr', VipAdminController.SupprList);
    app.get('/admin/vip/suppr/:num', VipAdminController.SupprBD);

    app.get('/admin/photos',function (request,response) {
      response.render('admin/photos', response);
    })

    app.get('/deco',function (request,response) {
      request.session.connected = false;
      request.session.login = null;
      response.render('admin/auth', response);
    })


};
