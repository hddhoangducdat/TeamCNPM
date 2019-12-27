const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  picture: String,
  sex: String,
  address: String
});

module.exports = mongoose.model("user", userSchema, "user");
