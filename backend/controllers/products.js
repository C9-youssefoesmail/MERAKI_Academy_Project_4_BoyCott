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
  const createdBy = req.token.userId;

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
const getAllProducts = (req, res) => {
  productModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//getProductByCategory
const getProductByCategory = (req, res) => {
  const { categories } = req.params;

  productModel
    .find({ categories })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Category found",
        category: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};

//getProductById
const getProductById = (req,res) => {
    const {_id} = req.params

    productModel
    .find({_id})
    .then((result)=>{
        res.status(200).json({
            success: true,
            message: "product found",
            _product: result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err
        })
    })
}

//updateProductById

//deleteProductById

module.exports = {
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
};
