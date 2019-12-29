var express = require("express");
var passport = require('passport');
var router = express.Router();

/* GET home page. */
module.exports = (passport) => {
  router.get("/", (req, res) => {
    res.render("signup", { title: "Black Hole", condition: false, usernameWarning: req.flash('usernameWarning'), passwordWarning: req.flash('passwordWarning') });
  });
  
  router.post('/', passport.authenticate('signup', {
      successRedirect: '/login',
      failureRedirect: '/signup',
      failureFlash : true 
    })
  );

  return router;
}
