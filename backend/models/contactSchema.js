const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  text: { type: String, require: true },
});

//modify email toLowerCase()
contactSchema.pre("save",function(){
  this.email = this.email.toLowerCase();
})

module.exports = mongoose.model("contact", contactSchema);
