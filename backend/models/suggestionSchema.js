const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema({
  productName: { type: String, require: true },
  reason: { type: String, require: true },
  productImage: { type: String, require: true },
  isSafeProduct: { type: Boolean, require: true },
  oppositeProduct: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  categories: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  status: { type: String, require: true },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
