var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
var isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/:id", productController.product_info("product"));
router.post("/comment/:id", isAuthenticated, productController.product_comment);

module.exports = router;
