const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  picture: String,
  sex: String,
  address: String,
  image: String,
  blocked: Boolean
});

module.exports = mongoose.model("user", userSchema, "user");
