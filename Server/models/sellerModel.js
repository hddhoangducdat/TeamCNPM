const mongoose = require("mongoose");

const sellerScheme = new mongoose.Schema({
  id: String,
  image: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  type: String
});

module.exports = mongoose.model("seller", sellerScheme, "seller");
