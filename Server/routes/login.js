var express = require("express");
var router = express.Router();

/* GET home page. */
module.exports = (passport) => {
  router.get("/", (req, res) => {
    res.render("login", { title: "Black Hole", condition: false, usernameWarning: req.flash('usernameWarning'), passwordWarning: req.flash('passwordWarning') });
  });
  
  router.post('/', passport.authenticate('login', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash : true 
    })
  );

  return router;
}
