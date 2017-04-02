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


};
