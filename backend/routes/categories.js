const express = require("express");

const { createCategory, getCategoryById,  } = require("../controllers/categories");

const categoriesRouter = express.Router();

//CURDs
categoriesRouter.post("/", createCategory);
categoriesRouter.get("/:id",getCategoryById)

categoriesRouter.use("*", (req, res) => {
  res.json("categoriesRouter is working");
});

module.exports = categoriesRouter;
