const express = require("express");

const { createComment, deleteCommentById, deleteCommentByAuthor } = require("../controllers/comments");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const commentsRouter = express.Router();

//CURDs
commentsRouter.post("/", authentication, createComment);
commentsRouter.delete("/search_1/:id", authentication, deleteCommentById);
commentsRouter.delete("/search_2/:id",authentication, authorization("DELETE_COMMENT"), deleteCommentByAuthor)

commentsRouter.use("*", (req, res) => {
  res.json("commentsRouter is working");
});

module.exports = commentsRouter;
