var promise = require('bluebird');


var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var configlogin = {
  host: 'localhost',
  port: 5432,
  database: 'pfe',
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
      name: "getAllLogin",
      text: "select * from vue_login"
    })
      .then(function (data) {
        console.log('Récupération des login')
        console.log('Nombre de sessions : ')
        console.log(data.length);
        var found = false;

        for (var i=0; i<data.length; i++) {
          var emaili = data[i].email;
          var passwordi = data[i].password;
          /*console.log('email et password de session active : ')
          console.log(emaili)
          console.log(passwordi)*/

          if (emaili == req.body.email) {
            if(passwordi == req.body.password){
              console.log('on a déjà cet email et mot de passe dans notre base, ok on redirige');
              found = true;
              req.session.regenerate(function(err) {
                console.log('je susi dans le callback')
                req.session.email = emaili;
                req.session.password = passwordi;
                res.redirect("/");
              });
              break;
            }
            else {
              console.log('Mot de passe pas OK pour cet email, réessayez')
              options.error = "Mot de passe pas OK pour cet email, réessayez";
              found = true;
              res.render('login', options);
              break;
            }
          }
        }

        if (found==false){
          console.log('Votre email est pas dans notre base, réessayez')
          options.error = "Votre email est pas dans notre base, réessayez";
          res.render('login', options);
        }
      })

      .catch(function (err) {
        console.log(err)
        return next(err);
      });
  }
}

/*function logout(req, res, next){
  var options = { email: undefined, password: undefined, error: null };
  req.session.destroy(function(err) {
    res.render('login', options);
  });
  res.render('login', options);

}*/

module.exports = {
  auth: auth
  //logout: logout
};
