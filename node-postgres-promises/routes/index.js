var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/patients', db.getAllPatients);
router.get('/api/ppatients/:id', db.getSinglePatient);
router.post('/api/patients', db.createPatient);
router.put('/api/patients/:id', db.updatePatient);
router.delete('/api/patients/:id', db.removePatient);


module.exports = router;
