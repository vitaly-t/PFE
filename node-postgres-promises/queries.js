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


var csv = require('csv-stream');
var request = require('request');
var fs = require('fs');

// All of these arguments are optional.
var options = {
    delimiter : ';', // default is ,
    endLine : '\n', // default is \n,
// by default read the first line and use values found as columns
    columns : ['tag', 'temps','x','y','z'],
    escapeChar : '"', // default is an empty string
    enclosedChar : '"' // default is an empty string
}

var csvStream = csv.createStream(options);


function getAllPatients(req, res, next) {
  db.any({
    name: "getAllPatients",
    text: "select * from patients"
  })
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
  db.one({
    name: "getSinglePatient",
    text: "select * from patients where id_patient = $1",
    values: [id_patient]
  })
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
  console.log(req.body);
  db.none({
    name: "createPatient",
    text: "insert into patients(nom, prenom, sexe, naissance, pathologie) values($1, $2, $3, $4, $5)",
    values: [req.body.nom, req.body.prenom, req.body.sexe, req.body.naissance, req.body.pathologie]
  })
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
  db.none({
    name: "updatePatient",
    text: 'update patients set nom=$1, prenom=$2, sexe=$3, naissance=$4, pathologie=$5 where id_patient=$6',
    values: [req.body.nom, req.body.prenom, req.body.sexe, req.body.naissance,req.body.pathologie, parseInt(req.params.id)]
  })
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
  db.result({
    name: "removePatient",
    text: "delete from patients where id_patient = $1",
    values: [id_patient]
  })
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
  db.any({
    name: "getAllMedecins",
    text: "select * from medecins"
  })
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
  db.any({
    name: "getAllSuivis",
    text: "select * from suivis"
  })
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
  db.any({
    name: "getAllMesures",
    text: "select * from mesures"
  })
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
  db.any({
    name: "getAllPlacements",
    text: "select * from placements"
  })
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
  db.any({
    name: "getAllCapteurs",
    text: "select * from capteurs"
  })
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
  db.any({
    name: "getAllDeploiements",
    text: "select * from deploiements"
  })
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
  db.any({
    name: "getAllDonnees",
    text: "select * from donnees"
  })
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

function importDonnees(req, res, next) {
  console.log('File Uploaded :');
  console.log(req.file);
  console.log('...');
  if(req.fileValidationError) {
              return res.end(req.fileValidationError);
        }

    var path = '/home/lalanne/PFE/PFE/node-postgres-promises/' + req.file.path
    console.log('PATH:' + path)
    fs.createReadStream(path).pipe(csvStream)
       .on('error',function(err){
           console.error(err);
       })
       .on('data',function(data){
           // outputs an object containing a set of key/value pair representing a line found in the csv file.
           //console.log(data);
           db.none({
             name: "importDonnees",
             text: "insert into donnees values(2, $1, $2, $3, $4)",
             values: [data.temps, data.x, data.y, data.z]
           });
             /*.then(function () {
               res.status(200)
                 .json({
                   status: 'success',
                   message: 'Inserted one donnee'
                 });
             })
             .catch(function (err) {
               return next(err);
             });*/
       })
       .on('column',function(key,value){
           // outputs the column name associated with the value found
          //console.log('#' + key + ' = ' + value);
           //console.log('# '   + value);

       })
       console.log('File Imported into DB');
       res.render('upload', { title: 'LUL' })
}


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
  importDonnees: importDonnees,
  patients: patients,
  medecins: medecins,
  suivis: suivis,
  deploiements: deploiements,
  donnees: donnees
};
