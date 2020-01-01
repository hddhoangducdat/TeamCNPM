var express = require("express");
var router = express.Router();
var profileController = require("../controllers/userController");

/* GET home page. */
router.get("/", profileController.profile_info);

module.exports = router;
