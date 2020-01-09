const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: String,
  history: String,
  bill: Array
});

module.exports = mongoose.model("history", historySchema, "history");
