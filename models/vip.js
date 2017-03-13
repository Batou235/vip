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

module.exports.getDefileCouturier = function(num,callback){
  db.getConnection(function(err,connexion){
    if(!err){
      var sql = "SELECT d.defile_lieu, d.defile_date from couturier c join defile d on (c.vip_numero = d.vip_numero) WHERE c.vip_numero = " + num;
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.getDefileMannequin = function(num,callback){
  db.getConnection(function(err,connexion){
    if(!err){
      var sql = "SELECT d.defile_lieu, d.defile_date, v.vip_prenom, v.vip_nom FROM mannequin m JOIN defiledans dd ON (dd.vip_numero = m.vip_numero) JOIN defile d ON (dd.defile_numero = d.defile_numero) JOIN couturier c ON (d.vip_numero = c.vip_numero) JOIN vip v ON (v.vip_numero = c.vip_numero) WHERE m.vip_numero = " + num;
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.getAlbumChanteur = function(num,callback){
  db.getConnection(function(err,connexion){
    if(!err){
      var sql = "SELECT c.chanteur_specialite, a.album_titre, a.album_date, m.maisondisque_nom FROM chanteur c JOIN composer co ON (co.vip_numero = c.vip_numero) JOIN album a ON (a.album_numero = co.album_numero) JOIN maisondisque m ON (m.maisondisque_numero = a.maisondisque_numero) WHERE c.vip_numero = " + num;
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.getFilmsActeurs = function(num,callback){
  db.getConnection(function(err,connexion){
    if(!err){
      var sql = "SELECT a.acteur_datedebut, f.film_titre, j.role_nom, f.film_daterealisation, v.vip_nom, v.vip_prenom FROM acteur a LEFT OUTER JOIN joue j ON (j.vip_numero = a.vip_numero) LEFT OUTER JOIN film f ON(f.film_numero = j.film_numero) LEFT OUTER JOIN realisateur r ON (f.vip_numero = r.vip_numero) LEFT OUTER JOIN vip v ON (r.vip_numero = v.vip_numero) WHERE a.vip_numero = " + num;
      connexion.query(sql, callback);
      connexion.release();
    }
  });
}

module.exports.getFilmsRealisateurs = function(num,callback){
  db.getConnection(function(err,connexion){
    if(!err){
      var sql = "SELECT f.film_titre, f.film_daterealisation FROM film f RIGHT OUTER JOIN realisateur r  ON (r.vip_numero = f.vip_numero) WHERE r.vip_numero = " + num;
      connexion.query(sql,callback);
      connexion.release();
    }
  })
}

module.exports.getMariage = function(num,callback){
    db.getConnection(function(err, connexion){
        if(!err){

            var sql = "SELECT m.VIP_VIP_NUMERO AS mari, v.VIP_NOM, v.VIP_PRENOM, m.DATE_EVENEMENT, m.MARIAGE_FIN, m.MARIAGE_LIEU, m.MARIAGE_FIN, m.MARIAGE_MOTIFFIN FROM mariage m JOIN vip v ON (m.VIP_VIP_NUMERO = v.VIP_NUMERO) WHERE m.VIP_NUMERO = " + num + " UNION SELECT v.VIP_NUMERO AS mari, v.VIP_NOM, v.VIP_PRENOM, m.DATE_EVENEMENT, m.MARIAGE_FIN, m.MARIAGE_LIEU, m.MARIAGE_FIN, m.MARIAGE_MOTIFFIN FROM mariage m JOIN vip v ON (v.VIP_NUMERO = m.VIP_NUMERO) WHERE m.VIP_VIP_NUMERO ="+num+"";

            connexion.query(sql, callback);
            connexion.release();

        }
    });
};



//TODO 1 requete SQL pour chaque professio
