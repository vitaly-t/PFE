var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/pfe';
var config = {
  host: 'localhost',
  port: 5432,
  database: 'pfe',
  user: 'lalanne',
  password: 'lucie1234'
}
var db = pgp(config);


function getAllPatients(req, res, next) {
  db.any('select * from patients')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL patients'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePatient(req, res, next) {
  var id_patient = parseInt(req.params.id);
  db.one('select * from patients where id_patient = $1', id_patient)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE patient'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPatient(req, res, next) {
  //req.body.age = parseInt(req.body.age);
  db.none('insert into patients(nom, prenom, sexe, naissance, pathologie)' +
      'values(${nom}, ${prenom}, ${sexe}, ${naissance}, ${pathologie})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one patient'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updatePatient(req, res, next) {
  db.none('update patients set nom=$1, prenom=$2, sexe=$3, naissance=$4, pathologie=$5 where id_patient=$6',
    [req.body.nom, req.body.prenom, req.body.sexe,
      req.body.naissance,req.body.pathologie, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated patient'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function removePatient(req, res, next) {
  var id_patient = parseInt(req.params.id);
  db.result('delete from patients where id_patient = $1', id_patient)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} patient`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllMedecins(req, res, next) {
  db.any('select * from medecins')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL medecins'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllSuivis(req, res, next) {
  db.any('select * from suivis')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL suivis'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllMesures(req, res, next) {
  db.any('select * from mesures')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL mesures'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllPlacements(req, res, next) {
  db.any('select * from placements')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL placements'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllCapteurs(req, res, next) {
  db.any('select * from capteurs')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL capteurs'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllDeploiements(req, res, next) {
  db.any('select * from deploiements')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL deploiements'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getAllDonnees(req, res, next) {
  db.any('select * from donnees')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL donnees'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



module.exports = {
  getAllPatients: getAllPatients,
  getSinglePatient: getSinglePatient,
  createPatient: createPatient,
  updatePatient: updatePatient,
  removePatient: removePatient,
  getAllMedecins: getAllMedecins,
  getAllSuivis: getAllSuivis,
  getAllMesures: getAllMesures,
  getAllPlacements: getAllPlacements,
  getAllCapteurs: getAllCapteurs,
  getAllDeploiements: getAllDeploiements,
  getAllDonnees: getAllDonnees,
};
