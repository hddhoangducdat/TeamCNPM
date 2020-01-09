var sellerModel = require("../models/sellerModel");

exports.show_profile = (req, res) => {
  res.render("profilePage", {
    title: "Black Hole Admin",

    user: {
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      image: req.user.image,
      name: req.user.username,
      type: req.user.type === "admin" ? true : false
    }
  });
};

exports.upload_profile = async (req, res) => {
  let seller = await sellerModel.findById(req.user._id);
  seller.firstName = req.body.firstName;
  seller.lastName = req.body.lastName;
  seller.username = req.body.username;
  seller.email = req.body.email;
  if (req.file) {
    seller.image =
      "https://black-hole-admin.herokuapp.com/" +
      "uploads/" +
      req.file.filename;
  }
  await seller.save();
  res.redirect("/profile");
};
