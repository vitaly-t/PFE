var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest:'uploads/',
  fileFilter: function (req, file, cb) {
   if (file.mimetype !== 'text/csv') {
    req.fileValidationError = 'goes wrong on the mimetype';
    return cb(null, false, new Error('goes wrong on the mimetype'));
   }
   cb(null, true);
  }
});

var db = require('../queries');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'LUL' });
});
router.get('/importation', function(req, res, next) {
  res.render('importation', { title: 'LUL' });
});
router.get('/patients', db.patients);
router.get('/medecins', db.medecins);


router.get('/api/patients', db.getAllPatients);
router.get('/api/patients/:id', db.getSinglePatient);
router.post('/api/patients', db.createPatient);
router.put('/api/patients/:id', db.updatePatient);
router.delete('/api/patients/:id', db.removePatient);
router.get('/api/medecins', db.getAllMedecins);
router.get('/api/suivis', db.getAllSuivis);
router.get('/api/mesures', db.getAllMesures);
router.get('/api/placements', db.getAllPlacements);
router.get('/api/capteurs', db.getAllCapteurs);
router.get('/api/deploiements', db.getAllDeploiements);
router.get('/api/donnees', db.getAllDonnees);
router.post('/upload', upload.single('fichier'), db.importDonnees);


module.exports = router;
