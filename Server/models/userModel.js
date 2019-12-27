const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});

module.exports = mongoose.model("user", userSchema, "user");
