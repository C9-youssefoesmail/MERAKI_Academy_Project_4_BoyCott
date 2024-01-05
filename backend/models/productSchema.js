const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: { type: String, require: true },
  reason: { type: String, require: true },
  link: {},
  productImage: { type: Image, require: true }, //! src
  isSafeProduct: { type: Boolean, require: true },
  oppositeProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, //!Product
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },//! [{}]
});

module.exports = mongoose.module("Product", productSchema);
