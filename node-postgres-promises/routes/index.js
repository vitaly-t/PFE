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

var dbfct = require('../queries');

function requireLogin (req, res, next) {
  if (req.session.email) {
    // User is authenticated, let him in
    next();
  } else {
    // Otherwise, we redirect him to login form
    res.redirect("/login");
  }
}

router.get('/login', function(req, res, next) {
  console.log('DANS GET')
  console.log(req.session.email)
  res.render('login', { title: 'LUL', email: req.session.email, error: null });
});

router.post("/login", dbfct.auth);


router.get('/',[requireLogin], dbfct.acceuil);

router.get('/importation', function(req, res, next) {
  res.render('importation', { title: 'LUL' });
});
router.get('/patients', dbfct.patients);
router.get('/medecins', dbfct.medecins);
router.get('/suivis', dbfct.suivis);
router.get('/deploiements', dbfct.deploiements);
router.get('/donnees', dbfct.donnees);


router.get('/api/patients', dbfct.getAllPatients);
router.get('/api/patients/:id', dbfct.getSinglePatient);
router.post('/api/patients', dbfct.createPatient);
router.put('/api/patients/:id', dbfct.updatePatient);
router.delete('/api/patients/:id', dbfct.removePatient);
router.get('/api/medecins', dbfct.getAllMedecins);
router.get('/api/mesures', dbfct.getAllMesures);
router.get('/api/suivis', dbfct.getAllSuivis);
router.get('/api/placements', dbfct.getAllPlacements);
router.get('/api/capteurs', dbfct.getAllCapteurs);
router.get('/api/deploiements', dbfct.getAllDeploiements);
router.get('/api/donnees', dbfct.getAllDonnees);
router.post('/upload', upload.single('fichier'), dbfct.importDonnees);


module.exports = router;
