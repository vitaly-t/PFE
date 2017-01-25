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
  getAllDonnees: getAllDonnees
};
