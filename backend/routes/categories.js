const express = require("express");

const { createCategory, getCategoryById, getAllCategories } = require("../controllers/categories");

const categoriesRouter = express.Router();

//CURDs
categoriesRouter.post("/", createCategory);
categoriesRouter.get("/:id",getCategoryById)
categoriesRouter.get("/",getAllCategories)

categoriesRouter.use("*", (req, res) => {
  res.json("categoriesRouter is working");
});

module.exports = categoriesRouter;
