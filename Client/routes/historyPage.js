var express = require("express");
var router = express.Router();
var historyController = require("../controllers/historyController");
var isAuthenticated = require("../middlewares/isAuthenticated");

/* GET home page. */
router.get("/", isAuthenticated, historyController.history_list);
router.post("/purchase", isAuthenticated, historyController.purchase_product);
router.post("/cancleBill", isAuthenticated, historyController.cancle_bill);

module.exports = router;
