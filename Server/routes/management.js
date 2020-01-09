var express = require("express");
var isAuthenticated = require("../middlewares/isAuthenticated");
var router = express.Router();
var productController = require("../controllers/productController");
var userController = require("../controllers/userController");
var billController = require("../controllers/billController");
var multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage
}).single("myImage");

/* GET home page. */
router.get("/product", isAuthenticated, productController.seller_product);
router.get(
  "/product/category/:category",
  isAuthenticated,
  productController.product_category
);
router.get(
  "/product/:id",
  isAuthenticated,
  productController.one_seller_product
);

router.get(
  "/product/modify/:id",
  isAuthenticated,
  productController.one_product
);
router.post(
  "/product/modify/submit/:id",
  isAuthenticated,
  upload,
  productController.change_product
);
router.post(
  "/product/carousel",
  isAuthenticated,
  productController.add_carousel
);
router.post(
  "/product/delete",
  isAuthenticated,
  productController.delete_product
);

router.get("/brand", isAuthenticated, userController.all_seller);

router.get("/shopping", isAuthenticated, billController.show_bill);
router.post(
  "/shopping/cancleBill",
  isAuthenticated,
  billController.cancle_bill
);
router.post("/shopping/findItem", isAuthenticated, billController.find_item);
router.post(
  "/shopping/shippingItem",
  isAuthenticated,
  billController.shipping_item
);
router.post(
  "/shopping/finishItem",
  isAuthenticated,
  billController.finish_item
);

module.exports = router;
