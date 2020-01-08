var express = require("express");
var isAuthenticated = require("../middlewares/isAuthenticated");
var productController = require("../controllers/productController");
var router = express.Router();
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
}).single("uploadProduct");

router.get("/", isAuthenticated, productController.show_form_upload_product);

router.post(
  "/submit",
  isAuthenticated,
  upload,
  productController.upload_product
);

module.exports = router;
