const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  typeName: [{ type: String }],
});

module.exports = mongoose.module("Category", categorySchema);
