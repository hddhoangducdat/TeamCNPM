const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  image: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  type: String
});

module.exports = mongoose.model("seller", userSchema, "seller");
