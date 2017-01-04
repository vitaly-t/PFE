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

function accueil(req, res, next) {
  req.session.index = (req.session.index || 0) + 1;
  res.render('index', {title: 'LUL', sessID: req.sessionID, email: req.session.email, password: req.session.password , index: req.session.index})
}




module.exports = {
  importDonnees: importDonnees,
  patients: patients,
  medecins: medecins,
  suivis: suivis,
  deploiements: deploiements,
  donnees: donnees,
  accueil: accueil
};
