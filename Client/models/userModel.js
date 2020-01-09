const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  image: String,
  sex: String,
  address: String,
  blocked: Boolean
});

module.exports = mongoose.model("user", userSchema, "user");
