const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  role: { type: String, require: true },
  permissions: [{ type: String }],// FOR USER => ["CREATE_COMMENT","DELETE_COMMENT"]
  //! FOR ADMIN => ["CREATE_PRODUCT","CREATE_COMMENT","DELETE_PRODUCT","DELETE_COMMENT","UPDATE_PRODUCT","DELETE_USER"]
});

module.exports = mongoose.model("Role", roleSchema);
