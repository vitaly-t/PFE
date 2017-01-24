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

var apifct = require('../queriesapi');
var dbfct = require('../queries');
var loginfct = require('../login');
var graphfct = require('../graphs');
var importfct = require('../import')

function requireLogin (req, res, next) {
  if (req.session.user && req.session.password) {
    if ((req.session.user == 'undefined')||(config.user == 'undefined'))
    {
      res.redirect("/login");
    }
    else {
      // User is authenticated, let him in
      next();
    }
  } else {
    // Otherwise, we redirect him to login form
    res.redirect("/login");
  }
}

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LUL', user: req.session.user, password: req.session.password, error: null });
});

router.post("/login", loginfct.auth);
router.get('/logout', loginfct.logout);

router.get('/',[requireLogin], dbfct.accueil);
router.get('/profil', [requireLogin], dbfct.profil);
router.get('/patients',[requireLogin], dbfct.patients);
router.get('/medecins', [requireLogin],dbfct.medecins);
router.get('/suivis',[requireLogin], dbfct.suivis);
router.get('/deploiements', [requireLogin],dbfct.deploiements);
router.get('/donnees', [requireLogin],dbfct.donnees);

router.get('/ajout', function(req, res, next) {
  res.render('ajout', { title: 'LUL' });
});
router.post('/ajout', [requireLogin],dbfct.ajout);


router.get('/importation', [requireLogin], importfct.formImport);
router.post('/upload', upload.single('fichier'), importfct.importDonnees);

router.post('/graphiques', [requireLogin],graphfct.graphiques);
router.get('/graphiques', [requireLogin],graphfct.formGraphs);


router.get('/api/patients', apifct.getAllPatients);
router.get('/api/patients/:id', apifct.getSinglePatient);
router.post('/api/patients', apifct.createPatient);
router.put('/api/patients/:id', apifct.updatePatient);
router.delete('/api/patients/:id', apifct.removePatient);
router.get('/api/medecins', apifct.getAllMedecins);
router.get('/api/mesures', apifct.getAllMesures);
router.get('/api/suivis', apifct.getAllSuivis);
router.get('/api/placements', apifct.getAllPlacements);
router.get('/api/capteurs', apifct.getAllCapteurs);
router.get('/api/deploiements', apifct.getAllDeploiements);
router.get('/api/donnees', apifct.getAllDonnees);



module.exports = router;
