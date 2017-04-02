var model = require("../../models/vipAdmin.js")
var async = require("async");

module.exports.Menu = function (request,response) {
  response.render('admin/vipMenu',response);
}

module.exports.AjoutForm = function (request,response) {
  response.render('admin/vipAjout',response);
}

module.exports.AjoutBD = function (request,response) {

}
