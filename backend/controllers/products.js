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
  } = req.body;
  const createdBy = req.token.userId

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
const getAllProducts = (req,res) => {
    productModel
    .find({})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
}

//getProductByCategory


//getProductById


//updateProductById

//deleteProductById

module.exports = {
  createProduct,
  getAllProducts
};
