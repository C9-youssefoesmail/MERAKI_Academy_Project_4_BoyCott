const commentsModel = require("../models/commentSchema");
const productModel = require("../models/productSchema");

//createComment
const createComment = (req, res) => {
  const { comment, product } = req.body;
  const myDate = new Date();
  const createdDate = myDate;
  const createdBy = req.token.userId;
  const newComment = new commentsModel({
    comment,
    product, //product ID
    createdBy, //user ID
    createdDate,
  });
  newComment
    .save()
    .then((result) => {
      productModel
        .findByIdAndUpdate(
          { _id: product },
          { $push: { review: result._id } },
          { new: true }
        )
        .then((result) => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.send({
            success: false,
            message: "productModel Error",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};

//deleteCommentById
const deleteCommentById = (req, res) => {
  const { id } = req.params;
  const createdBy = req.token.userId;
  commentsModel
    .findOneAndDelete({ _id: id, createdBy })
    .then((result) => {
      //if there is no result that mean the userId in createdBy is not the user who create this comment
      if (result) {
        res.status(200).json({
          success: true,
          message: "comment deleted",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "cant delete",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};

//deleteCommentByAuthor
const deleteCommentByAuthor = (req,res) => {
  const { id } = req.params;
  commentsModel
    .findOneAndDelete({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "comment deleted",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "cant delete",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
}

module.exports = {
  createComment,
  deleteCommentById,
  deleteCommentByAuthor,
};
