var express = require("express");
var router = express.Router();
var cartController = require("../controllers/cartController");

/* GET home page. */
router.get("/", cartController.cart_list);

module.exports = router;
