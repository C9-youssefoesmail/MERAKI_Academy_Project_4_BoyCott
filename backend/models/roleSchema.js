const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  role: { type: String, require: true },
  permissions: [{ type: String }],
});

module.exports = mongoose.model("Role", roleSchema);
