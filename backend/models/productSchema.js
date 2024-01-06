const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: { type: String, require: true },
  reason: { type: String, require: true },
  link: {type: String, require: true},
  productImage: { type: String, require: true },
  isSafeProduct: { type: Boolean, require: true },
  categories: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  oppositeProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },//! FrontEnd
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Product", productSchema);
