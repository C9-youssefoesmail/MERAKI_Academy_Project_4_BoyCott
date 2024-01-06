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

module.exports = {
  createCategory,
};
