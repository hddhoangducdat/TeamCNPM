var express = require("express");
var router = express.Router();
var isAuthenticated = require("../middlewares/isAuthenticated");
var homeController = require("../controllers/homeController");
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
}).single("userImage");

/* GET users listing. */
router.get("/", isAuthenticated, homeController.home_show);
router.get("/:id", isAuthenticated, homeController.user_info);
router.post("/delete", isAuthenticated, homeController.seller_delete);
router.post(
  "/:id/change",
  isAuthenticated,
  upload,
  homeController.change_user_info
);
router.post("/:id/block", isAuthenticated, homeController.block_user);
router.post("/:id/unblock", isAuthenticated, homeController.unblock_user);
module.exports = router;
