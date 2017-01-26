var promise = require('bluebird');


var options = {
  // Initialization Options
  promiseLib: promise
};

dbuser = 'undefined'
dbpassword = 'undefined'

var pgp = require('pg-promise')(options);

config = {
  host: 'localhost',
  port: 5432,
  database: 'pfe',
  user: dbuser,
  password: dbpassword
}
db = pgp(config);






function patients(req, res, next) {
  db.any({
    name: "getAllPatients",
    text: "select * from patients"
  })
    .then(function (data) {
      console.log('Récupération des données patients')
      console.log('Nombre de patients : ')
      console.log(data.length);
      res.render('patients', { title: 'LUL', max: data.length, tab: data});
    })
    .catch(function (err) {
      return next(err);
    });
}

function medecins(req, res, next) {
  db.any({
    name: "getAllMedecins",
    text: "select * from medecins"
  })
    .then(function (data) {
      console.log('Récupération des données medecins')
      console.log('Nombre de medecins : ')
      console.log(data.length);
      res.render('medecins', { title: 'LUL', max: data.length, tab: data});
    })
    .catch(function (err) {
      return next(err);
    });
}


function suivis(req, res, next) {
  if (req.session.user == 'lalanne'){
    db.any({
      name: "getAllSuivisAdmin",
      text: "select * from vue_suivis"
    })
      .then(function (data) {
        console.log('Récupération des données suivis')
        console.log('Nombre de suivis : ')
        console.log(data.length);
        res.render('suivis', { title: 'LUL', max: data.length, tab: data});
      })
      .catch(function (err) {
        return next(err);
      });
  }
  else{
    db.any({
      name: "getAllSuivis",
      text: "select * from vue_suivis where username_patient = $1 or username_medecin=$2",
      values: [req.session.user, req.session.user]
    })
      .then(function (data) {
        console.log('Récupération des données suivis')
        console.log('Nombre de suivis : ')
        console.log(data.length);
        res.render('suivis', { title: 'LUL', max: data.length, tab: data});
      })
      .catch(function (err) {
        return next(err);
      });
  }
}



function deploiements(req, res, next) {
  if (req.session.user == 'lalanne'){
    db.any({
      name: "getAllDeploiementsAdmin",
      text: "select * from vue_deploiement"
    })
      .then(function (data) {
        console.log('Récupération des données de déploiements')
        console.log('Nombre de déploiements : ')
        console.log(data.length);
        res.render('deploiements', { title: 'LUL', max: data.length, tab: data});
      })
      .catch(function (err) {
        return next(err);
      });
  }
  else{
    db.any({
      name: "getAllDeploiements",
      text: "select * from vue_deploiement where username_patient = $1 or username_medecin=$2",
      values: [req.session.user, req.session.user]
    })
      .then(function (data) {
        console.log('Récupération des données de déploiements')
        console.log('Nombre de déploiements : ')
        console.log(data.length);
        res.render('deploiements', { title: 'LUL', max: data.length, tab: data});
      })
      .catch(function (err) {
        return next(err);
      });
  }
}


function donnees(req, res, next) {
  db.any({
    name: "getAllDonnees",
    text: "select * from donnees"
  })
    .then(function (data) {
      console.log('Récupération des données')
      console.log('Nombre de donnees : ')
      console.log(data.length);
      res.render('donnees', { title: 'LUL', max: data.length, tab: data});
    })
    .catch(function (err) {
      return next(err);
    });
}

function accueil(req, res, next) {
  req.session.index = (req.session.index || 0) + 1;
  res.render('index', {title: 'LUL', user: req.session.user, index: req.session.index})
}

function profil(req, res, next) {
  db.any({
    name: "getOneSuivis",
    text: "select * from vue_suivis where username_patient = $1 or username_medecin = $2",
    values: [req.session.user, req.session.user]
  })
    .then(function (data) {
      console.log('Récupération des données suivis')
      console.log('Nombre de suivis : ')
      console.log(data.length);
      //console.log(data[0].nom_patient)
      if (req.session.user == data[0].username_patient) {
        res.render('profil_patient', { title: 'LUL', max: data.length, tab: data});
      }
      else {
        res.render('profil_medecin', { title: 'LUL', max: data.length, tab: data});
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

function ajout(req, res, next) {
  console.log(req.body);
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var sexe = req.body.sexe;
  var naissance = req.body.naissance;
  var pathologie = req.body.pathologie;
  var username = req.body.username;
  var password = req.body.password;

  db.task(t=> {
    return t.batch([
      t.none({
        name: "importPatient",
        text: "insert into patients (nom,prenom,sexe,naissance, pathologie, username) values ($1, $2, $3, $4, $5, $6)",
        values: [nom, prenom, sexe, naissance, pathologie, username]
      }),
      t.any({
        name: "createUser",
        text: "create user $1 with inherit password $2 in role medecin",
        values:[username, password]
      })
    ]);
  })
  .then(data=> {
    res.redirect("/profil");
  })
  .catch(function (err) {
    return next(err);
  });

}






module.exports = {
  patients: patients,
  medecins: medecins,
  suivis: suivis,
  deploiements: deploiements,
  donnees: donnees,
  accueil: accueil,
  profil: profil,
  ajout: ajout
};
