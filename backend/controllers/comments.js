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

module.exports = {
  createComment,
};
