var db = require('../configDb');


module.exports.getUsers = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "SELECT * FROM parametres";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
