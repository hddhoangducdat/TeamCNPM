var express = require("express");
var isAuthenticated = require("../middlewares/isAuthenticated");
var profileController = require("../controllers/profileController");
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
}).single("sellerImage");

router.get("/", isAuthenticated, profileController.show_profile);

router.post(
  "/submit",
  isAuthenticated,
  upload,
  profileController.upload_profile
);

module.exports = router;
