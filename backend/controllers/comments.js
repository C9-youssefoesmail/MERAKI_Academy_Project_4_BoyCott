const commentsModel = require("../models/commentSchema");

//createComment
const createComment = (req, res) => {
  const { comment, product, createdBy } = req.body;
  const myDate = new Date();
  const createdDate = myDate;
  const newComment = new commentsModel({
    comment,
    product, //product ID
    createdBy, //user ID
    createdDate,
  });
  newComment
    .save()
    .then((result) => {
      res.send({
        success: true,
        message: "comment created",
        article: result,
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
  commentsModel
    .findOneAndDelete({ _id: id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "comment deleted",
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

module.exports = {
  createComment,
};
