const express = require("express");
const productController = require("../controllers/productController");
// const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

/* GET home page. */
router.get("/", productController.product_list("homePage"));

router.get("/home/:sort", productController.product_sort_list("homePage"));

module.exports = router;
