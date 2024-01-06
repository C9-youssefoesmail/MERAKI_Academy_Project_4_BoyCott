const express = require("express");

const { createCategory } = require("../controllers/categories");

const categoriesRouter = express.Router();

//CURDs
categoriesRouter.post("/", createCategory);

categoriesRouter.use("*", (req, res) => {
  res.json("categoriesRouter is working");
});

module.exports = categoriesRouter;
