
function auth(req, res, next){
  var options = { user: req.body.user, password: req.body.password, error: null };

  console.log('Voici nos users de 1.body et de 2.session :');
  console.log(req.body.user)
  console.log(req.session.user);
  console.log('Voici nos passwords de 1.body et de 2.session :');
  console.log(req.body.password)
  console.log(req.session.password);

  config.user=req.body.user
  config.password=req.body.password

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

    db.any({
      name: "getAllLogin",
      text: "select * from vue_login"
    })
      .then(function (data) {
        req.session.user = req.body.user;
        req.session.password = req.body.password;
        config.user=req.session.user
        config.password=req.session.password
        console.log('connexion à la base réussi, on redirige vers le site')
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err)
        return next(err);
      });
  }
}


function logout(req, res, next){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('deconnecté de ma session ! ')
      config.user='undefined'
      config.password='undefined'
      console.log('deconnecté de la base ! ')
      res.redirect('/login');
    }
  });
}

module.exports = {
  auth: auth,
  logout: logout
};
