var promise = require('bluebird');


var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var configlogin = {
  host: 'localhost',
  port: 5432,
  database: 'login',
  user: 'lalanne',
  password: 'lucie1234'
}
var dblogin = pgp(configlogin);

function auth(req, res, next){
  var options = { email: req.body.email, error: null };
  console.log('Voici nos emails de 1.body et de 2.session :');
  console.log(req.body.email)
  console.log(req.session.email);

  if (!req.body.email) {
    console.log('Un email est nécéssaire')
    options.error = "Un email est nécéssaire";
    res.render('login', options);

  } else if (req.body.email == req.session.email) {
    // User has not changed email, accept it as-is
    console.log('Nos email de body et de session correspondent, on redirige vers acceuil')
    res.redirect("/");

  } else {

    dblogin.any({
      name: "getAllSessions",
      text: "select * from session"
    })
      .then(function (data) {
        console.log('Récupération des sessions actives')
        console.log('Nombre de sessions : ')
        console.log(data.length);
        var found = false;

        for (var i=0; i<data.length; i++) {
          var emaili = data[i].sess.email;
          console.log('email de session active : ')
          console.log(emaili)
          if (emaili == req.body.email) {
            console.log('on a déjà cet email dans notre base, pas possible')
            options.error = "Cet email est déjà utilisé !";
            found = true;
            res.render('login', options);
            break;
          }
        }

        if (found==false){
          console.log('On met le nouvel email dans notre session')
          req.session.email = req.body.email;
          res.redirect("/");
        }
      })

      .catch(function (err) {
        console.log(err)
        return next(err);
      });
  }
}

module.exports = {
  auth: auth
};
