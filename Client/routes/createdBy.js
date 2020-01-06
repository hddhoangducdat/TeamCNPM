var express = require("express");
var _ = require("lodash");
var router = express.Router();
var productModel = require("../models/productModel");

/* GET home page. */
router.get("/:nsx", async (req, res) => {
  const carts = await productModel.find({ createdBy: req.params.nsx });

  res.render("createdBy", {
    title: "Black Hole",
    condition: false,
    user: req.user,
    carts
  });
});

module.exports = router;
