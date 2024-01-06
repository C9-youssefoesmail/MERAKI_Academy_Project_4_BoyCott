const productModel = require("../models/productSchema");

//createProduct
const createProduct = (req, res) => {
  const {
    productName,
    reason,
    link,
    productImage,
    isSafeProduct,
    categories,
    oppositeProduct,
    createdBy,
  } = req.body;

  const newProduct = new productModel({
    productName,
    reason,
    link,
    productImage,
    isSafeProduct,
    categories, //category ID
    oppositeProduct, //Product ID
    createdBy, // User ID
  });
  newProduct
    .save()
    .then((result) => {
      res.send({
        success: true,
        message: "product created",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "server error",
        error: err,
      });
    });
};

//getAllProducts

//getProductByCategory


//getProductById


//updateProductById

//deleteProductById

module.exports = {
  createProduct,
};
