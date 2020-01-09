const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  code: String,
  metatitle: String,
  description: String,
  producer: String,
  images: String,
  price: Number,
  promotionPrice: String,
  includedVAT: String,
  quantity: Number,
  categoryUrl: String,
  category: String,
  detail: String,
  createdDate: String,
  createdBy: String,
  modifiedBy: String,
  modifiedDate: String,
  metaKeywords: String,
  sellerId: String,
  sold: Number,
  carousel: String,
  productName: String
});

module.exports = mongoose.model("product", productSchema, "product");
