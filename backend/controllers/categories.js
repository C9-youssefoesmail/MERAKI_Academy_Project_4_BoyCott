const CategoryModel = require("../models/categorySchema");

//createcategory
const createCategory = (req, res) => {
  const { typeName } = req.body;

  const newcategory = new CategoryModel({
    typeName,
  });
  newcategory
    .save()
    .then((result) => {
      console.log(result);
      res.send({
        success: true,
        message: "Category Created Successfully",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "something went wrong",
        error: err,
      });
    });
};

//getCategoryById
const getCategoryById = (req,res) => {
  const { id } = req.params;

  CategoryModel
    .findById({ _id: id })
    .then((result)=>{
      res.send({
        success: true,
        message: "category found",
        _result: result
      });
    })
    .catch((err)=>{
      res.send({
        success: false,
        message: "there is error",
        error: err,
      });
    })
}

module.exports = {
  createCategory,
  getCategoryById,
};
