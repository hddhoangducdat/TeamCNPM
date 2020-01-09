const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: String,
  comments: Array
});

module.exports = mongoose.model("comment", commentSchema, "comment");
