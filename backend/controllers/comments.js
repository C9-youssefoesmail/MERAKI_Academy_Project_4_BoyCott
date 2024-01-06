const commentsModel = require("../models/commentSchema");

//createComment
const createComment = (req, res) => {
  const { comment, product, createdBy, createdDate } = req.body;
  var myDate = new Date();
  createdDate = myDate;
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
        article: "the new comment you created",
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
