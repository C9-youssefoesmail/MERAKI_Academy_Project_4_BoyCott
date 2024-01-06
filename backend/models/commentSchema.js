const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: { type: String, require: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdDate: {type: String, require: true}/*{
    timestamp: { type: Date, default: Date.now},
    ...
  }
  */
});

module.exports = mongoose.model("Comment", commentSchema);
