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

module.exports.getNats = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "SELECT * FROM nationalite";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.addVip = function(nom, prenom, sexe, dateNaissance, nationalite, commentaire, dateInsertion, callback) {
  if(!dateNaissance){
    dateNaissance = "NULL";
  }
  if(!commentaire){
    commentaire = "NULL";
  }
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "INSERT INTO vip (VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, NATIONALITE_NUMERO, VIP_TEXTE, VIP_DATE_INSERTION) VALUES ('"+nom+"','"+prenom+"','"+sexe+"',"+dateNaissance+","+nationalite+",'"+commentaire+"','"+dateInsertion+"')";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
