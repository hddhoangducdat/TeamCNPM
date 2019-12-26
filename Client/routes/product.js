var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");

router.get("/:id", productController.product_info("product"));

module.exports = router;
