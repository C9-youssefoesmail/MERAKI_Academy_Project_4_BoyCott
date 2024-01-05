const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: { type: String, require: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //createdDate
});

module.exports = mongoose.module("Comment", commentSchema);
