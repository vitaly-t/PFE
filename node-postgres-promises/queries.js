var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/patients';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllPatients: getAllPatients,
  getSinglePatient: getSinglePatient,
  createPatient: createPatient,
  updatePatient: updatePatient,
  removePatient: removePatient
};

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
