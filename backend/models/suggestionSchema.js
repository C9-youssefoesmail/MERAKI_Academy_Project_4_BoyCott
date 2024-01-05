const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema({
  productName: { type: String, require: true },
  reason: { type: String, require: true },
  //links,
  productImage: { require: true }, //! ?
  isSafeProduct: { type: Boolean, require: true },
  oppositeProduct: { type: String }, //links
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, require: true },
});

module.exports = mongoose.module("Suggestion", suggestionSchema);
