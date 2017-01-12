var promise = require('bluebird');


var options = {
  // Initialization Options
  promiseLib: promise
};

dbuser = 'undefined'
dbpassword = 'undefined'

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/pfe';
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
  db.any({
    name: "getAllSuivis",
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

function deploiements(req, res, next) {
  db.any({
    name: "getAllDeploiements",
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
  res.render('index', {title: 'LUL', sessID: req.sessionID, user: req.session.user, password: req.session.password , index: req.session.index})
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






module.exports = {
  patients: patients,
  medecins: medecins,
  suivis: suivis,
  deploiements: deploiements,
  donnees: donnees,
  accueil: accueil,
  profil: profil
};
