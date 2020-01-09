const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  code: String,
  metatitle: String,
  description: String,
  producer: String,
  images: String,
  price: String,
  sold: String,
  promotionPrice: String,
  includedVAT: String,
  quantity: String,
  categoryUrl: String,
  category: String,
  detail: String,
  createdDate: String,
  createdBy: String,
  modifiedBy: String,
  modifiedDate: String,
  metaKeywords: String,
  carousel: String,
  productName: String
});

module.exports = mongoose.model("product", productSchema, "product");
