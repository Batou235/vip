var AuthController = require('./../controllers/Admin/AuthController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', AuthController.Auth);
    app.post('/', AuthController.Connect);


};
