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

//NE FONCTIONNE PAS POUR L'INSTANT
/*
module.exports.addVip = function(nom, prenom, sexe, dateNaissance, nationalite, commentaire, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
*/
