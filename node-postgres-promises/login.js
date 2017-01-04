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
  var options = { email: req.body.email, password: req.body.password, error: null };
  console.log('Voici nos emails de 1.body et de 2.session :');
  console.log(req.body.email)
  console.log(req.session.email);
  console.log('Voici nos passwords de 1.body et de 2.session :');
  console.log(req.body.password)
  console.log(req.session.password);

  if ((!req.body.email)||(!req.body.password)) {
    console.log('Un email et un mot de passe sont nécéssaires')
    options.error = "Un email et un mot de passe sont nécéssaires";
    res.render('login', options);

  } else if ((req.body.email == req.session.email)&&(req.body.password == req.session.password)) {
    // User has not changed email, accept it as-is
    console.log('Nos email et mot de passe de body et de session correspondent, on redirige vers accueil')
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
          var passwordi = data[i].sess.password;
          console.log('email et password de session active : ')
          console.log(emaili)
          console.log(passwordi)

          if (emaili == req.body.email) {
            console.log('on a déjà cet email dans notre base, pas possible')
            options.error = "Cet email est déjà utilisé !";
            found = true;
            res.render('login', options);
            break;
          }
        }

        if (found==false){
          console.log('On met les nouveaux identifiants dans notre base session')
          req.session.email = req.body.email;
          req.session.password = req.body.password;
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
