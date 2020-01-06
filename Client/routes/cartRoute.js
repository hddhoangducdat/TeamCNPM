var express = require("express");
var router = express.Router();
var cartController = require("../controllers/cartController");
var isAuthenticated = require("../middlewares/isAuthenticated");

/* GET home page. */
router.get("/", cartController.cart_list);
router.post("/addtocart", isAuthenticated, cartController.addToCart);
router.post("/removeItem", isAuthenticated, cartController.remove_item);
router.post("/increase", isAuthenticated, cartController.increase_product);
router.post("/decrease", isAuthenticated, cartController.decrease_product);

module.exports = router;
