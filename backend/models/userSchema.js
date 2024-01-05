const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

//modify register email toLowerCase()
//

module.exports = mongoose.module("User", userSchema);
