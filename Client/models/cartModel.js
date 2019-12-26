const mongoose = require("mongoose");

const cartShema = new mongoose.Schema({
  userId: String,
  carts: Array
});

module.exports = mongoose.model("cart", cartShema, "cart");
