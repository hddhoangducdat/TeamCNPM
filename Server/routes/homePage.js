var express = require("express");
var router = express.Router();
var isAuthenticated = require("../middlewares/isAuthenticated");
var homeController = require("../controllers/homeController");

/* GET users listing. */
router.get("/", isAuthenticated, homeController.home_show);
router.post("/delete", isAuthenticated, homeController.delete_user);
router.post("/search", isAuthenticated, homeController.search_product);

module.exports = router;
