var express = require("express");
var _ = require("lodash");
var router = express.Router();
var productController = require("../controllers/productController");

/* GET home page. */

router.get("/:type", productController.product_list_categories("categories"));

router.get(
  "/:type/:sort",
  productController.product_sort_categories("categories")
);

module.exports = router;
