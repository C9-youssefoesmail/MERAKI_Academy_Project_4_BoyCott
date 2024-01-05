const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  name: { type: String, require: true },
  permissions: [{ type: String }],
});

module.exports = mongoose.model("Role", roleSchema);
