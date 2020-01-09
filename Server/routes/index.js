var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.render("login", { title: "TeamCNPM" });
});

router.get("/signup", function(req, res) {
  res.render("signup", { title: "TeamCNPM" });
});

router.get("/forgotPassword", function(req, res) {
  res.render("forgotPassword", { title: "TeamCNPM" });
});

module.exports = router;
