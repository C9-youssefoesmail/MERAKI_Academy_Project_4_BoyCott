// DB connection goes here
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://youssefoesmail:R51ngg1wNbB6T4xk@boycott.dpmudao.mongodb.net/")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
