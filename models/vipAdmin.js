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
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.listVip = function (callback) {
  db.getConnection(function (err,connexion) {
    if(!err){
      var sql = "SELECT VIP_NUMERO ,VIP_NOM, VIP_PRENOM FROM vip ORDER BY VIP_NOM";
      connexion.query(sql, callback);
      connexion.release();
    }
  })
};

module.exports.infoVip = function (num,callback) {
  db.getConnection(function (err,connexion) {
    if(!err){
      var sql = "SELECT VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, NATIONALITE_NUMERO, VIP_TEXTE, VIP_DATE_INSERTION FROM vip WHERE VIP_NUMERO = " + num + " ORDER BY VIP_NOM";
      connexion.query(sql, callback);
      connexion.release();
    }
  })
}

module.exports.modifVip = function (num, nom, prenom, sexe, dateNaissance, nationalite, commentaire, dateInsertion, callback) {
  if(!dateNaissance){
    dateNaissance = "NULL";
  }
  if(!commentaire){
    commentaire = "NULL";
  }
  db.getConnection(function(err, connexion) {
      if (!err) {
          var sql = "UPDATE vip SET VIP_NOM = '"+nom+"', VIP_PRENOM = '"+prenom+"', VIP_SEXE = '"+sexe+"', VIP_NAISSANCE = "+dateNaissance+", NATIONALITE_NUMERO = "+nationalite+", VIP_TEXTE = \""+commentaire+"\", VIP_DATE_INSERTION = '"+dateInsertion+"' WHERE VIP_NUMERO = "+num;
          console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}

module.exports.suppVip = function (num, callback) {
  db.getConnection(function (err,connexion) {
    if(!err){
      var sql = "DELETE e FROM exemplaire e JOIN article ar ON (e.EXEMPLAIRE_NUMERO = ar.EXEMPLAIRE_NUMERO) JOIN apoursujet ap ON(ap.ARTICLE_NUMERO = ar.ARTICLE_NUMERO) WHERE ap.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE c FROM comporte c WHERE c.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE ar FROM article ar JOIN apoursujet ap ON(ap.ARTICLE_NUMERO = ar.ARTICLE_NUMERO) WHERE ap.VIP_NUMERO =  " + num + ";";
      connexion.query(sql);
      var sql = "DELETE a FROM apoursujet a WHERE a.VIP_NUMERO =  " + num + ";";
      connexion.query(sql);
      var sql = "DELETE p FROM photo p WHERE p.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql ="DELETE l FROM liaison l WHERE l.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE l FROM liaison l WHERE l.VIP_VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE m FROM mariage m WHERE m.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE m FROM mariage m WHERE m.VIP_VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE r FROM realisateur r WHERE r.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE j FROM joue j WHERE j.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE f FROM film f WHERE f.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE a FROM acteur a WHERE a.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE m FROM maisondisque m JOIN album a ON (a.MAISONDISQUE_NUMERO = m.MAISONDISQUE_NUMERO) JOIN composer c ON (c.ALBUM_NUMERO = a.ALBUM_NUMERO) WHERE c.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE a FROM album a JOIN composer c ON (c.ALBUM_NUMERO = a.ALBUM_NUMERO) WHERE c.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE c FROM composer c WHERE c.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE c FROM chanteur c WHERE c.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE ag FROM agence ag JOIN apouragence ap ON (ag.AGENCE_NUMERO = ap.AGENCE_NUMERO) WHERE ap.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE a FROM apouragence a WHERE a.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE d FROM defiledans d WHERE d.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE c FROM couturier c WHERE c.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE m FROM mannequin m WHERE m.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE d FROM defile d WHERE d.VIP_NUMERO = " + num + ";";
      connexion.query(sql);
      var sql = "DELETE v FROM vip v WHERE v.VIP_NUMERO = " + num + ";";
      connexion.query(sql, callback);
      connexion.release();


    }
  })
}
