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
  var options = { user: req.body.user, password: req.body.password, error: null };
  console.log('Voici nos users de 1.body et de 2.session :');
  console.log(req.body.user)
  console.log(req.session.user);
  console.log('Voici nos passwords de 1.body et de 2.session :');
  console.log(req.body.password)
  console.log(req.session.password);

  if ((!req.body.user)||(!req.body.password)) {
    console.log('Un user et un mot de passe sont nécéssaires')
    options.error = "Un user et un mot de passe sont nécéssaires";
    res.render('login', options);

  } else if ((req.body.user == req.session.user)&&(req.body.password == req.session.password)) {
    // User has not changed user, accept it as-is
    console.log('Nos user et mot de passe de body et de session correspondent, on redirige vers accueil')
    config.user=req.session.user
    config.password=req.session.password
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
          var useri = data[i].username;
          var passwordi = data[i].password;
          /*console.log('user et password de session active : ')
          console.log(useri)
          console.log(passwordi)*/

          if (useri == req.body.user) {
            if(passwordi == req.body.password){
              console.log('on a déjà cet user et mot de passe dans notre base, ok on redirige');
              found = true;
              req.session.regenerate(function(err) {
                console.log('je susi dans le callback')
                req.session.user = useri;
                req.session.password = passwordi;
                config.user=req.session.user
                config.password=req.session.password
                res.redirect("/");
              });
              break;
            }
            else {
              console.log('Mot de passe pas OK pour cet user, réessayez')
              options.error = "Mot de passe pas OK pour cet user, réessayez";
              found = true;
              res.render('login', options);
              break;
            }
          }
        }

        if (found==false){
          console.log('Votre user est pas dans notre base, réessayez')
          options.error = "Votre user est pas dans notre base, réessayez";
          res.render('login', options);
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
  //logout: logout
};
