const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  userName: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

//modify register email toLowerCase()
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  //hashing
  this.password = await bcrypt.hash(this.password, 7);
});

module.exports = mongoose.model("User", userSchema);
