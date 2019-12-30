var express = require("express");
var router = express.Router();
var historyController = require("../controllers/historyController");

/* GET home page. */
router.get("/", historyController.history_list);

module.exports = router;
