var sellerModel = require("../models/sellerModel");
var _ = require("lodash");

exports.all_seller = async (req, res) => {
  var brand = await sellerModel.find();
  _.remove(brand, br => br.type === "admin");

  res.render("brandPage", {
    title: "TeamCNPM",
    user: {
      name: req.user.username,
      image: req.user.image,
      type: req.user.type === "admin" ? true : false
    },
    brand
  });
};
