const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products");
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
productsRouter.get("/", getAllProducts);
productsRouter.get("/:categories", getProductByCategory);
productsRouter.get("/search_1/:_id", getProductById);
productsRouter.put("/:id", updateProductById);
productsRouter.delete("/:id", deleteProductById);

productsRouter.use("*", (req, res) => {
  res.json("productsRouter is working");
});

module.exports = productsRouter;
