const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  sex: String,
  address: String,
  phone: String,
  picture: String
});

module.exports = mongoose.model("profile", profileSchema, "profile");
