var db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getFirstLetter = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "SELECT DISTINCT SUBSTRING(VIP_NOM,1,1) AS letter FROM vip ORDER BY letter";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getListStars = function(letter,num,callback){
  //console.log(letter);
  db.getConnection(function(err, connexion){
    if(!err){
      var sql = "SELECT v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM, v.VIP_NAISSANCE, v.VIP_TEXTE, n.NATIONALITE_NOM, p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM vip v JOIN photo p ON (v.VIP_NUMERO = p.VIP_NUMERO) JOIN nationalite n ON(n.NATIONALITE_NUMERO = v.NATIONALITE_NUMERO) WHERE SUBSTRING(VIP_NOM,1,1) = '"+letter+"' OR v.VIP_NUMERO = "+num+"";
      //console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.getMariage = function(num,callback){
    db.getConnection(function(err, connexion){
        if(!err){
            var sql = "SELECT * from mariage m JOIN vip v ON (v.VIP_NUMERO = m.VIP_NUMERO OR v.VIP_NUMERO = m.VIP_VIP_NUMERO) WHERE v.VIP_NUMERO = "+num+"";
                connexion.query(sql, callback);
                connexion.release();
        }
    });
};

module.exports.getCouturier = function(num,callback){
  db.getConnection(function(err,connexion){
    if(!err){
      var sql = "SELECT c.vip_numero from couturier c join vip v on (c.VIP_NUMERO = v.VIP_NUMERO) WHERE v.vip_numero = " + num;
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.getMari = function(num,callback){
    db.getConnection(function(err, connexion){
        if(!err){
            /*
            var sql1 = "SELECT VIP_VIP_NUMERO FROM mariage m WHERE VIP_NUMERO ="+num+"";
            var sql2 = "SELECT VIP_NUMERO FROM mariage m WHERE VIP_VIP_NUMERO ="+num+"";*/

            var sql = "SELECT m.VIP_VIP_NUMERO AS mari, v.VIP_NOM, v.VIP_PRENOM, m.DATE_EVENEMENT, m.MARIAGE_FIN, m.MARIAGE_LIEU, m.MARIAGE_FIN FROM mariage m JOIN vip v ON (m.VIP_VIP_NUMERO = v.VIP_NUMERO) WHERE m.VIP_NUMERO = " + num + " UNION SELECT v.VIP_NUMERO AS mari, v.VIP_NOM, v.VIP_PRENOM, m.DATE_EVENEMENT, m.MARIAGE_FIN, m.MARIAGE_LIEU, m.MARIAGE_FIN FROM mariage m JOIN vip v ON (v.VIP_NUMERO = m.VIP_NUMERO) WHERE m.VIP_VIP_NUMERO ="+num+"";
                //console.log(sql1);
                //console.log(sql2);

              connexion.query(sql, callback);
              connexion.release();

              /*
                if(connexion.query(sql1, callback)){
                    sql = sql1;
                }
                else{
                    sql = sql2;
                }
                connexion.query(sql, callback);
                connexion.release();*/
        }
    });
};




//TODO 1 requete SQL pour chaque professio
