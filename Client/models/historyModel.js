const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: String,
  histories: Array
});

module.exports = mongoose.model("history", historySchema, "history");
