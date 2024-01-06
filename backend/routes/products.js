const express = require("express");

const { createProduct ,getAllProducts } = require("../controllers/products");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const productsRouter = express.Router();

//CURDs
productsRouter.post(
  "/",
  authentication,
  authorization("CREATE_PRODUCT"),
  createProduct
);
productsRouter.get("/",getAllProducts)

productsRouter.use("*", (req, res) => {
  res.json("productsRouter is working");
});

module.exports = productsRouter;
