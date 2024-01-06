const express = require("express");

const { createComment, deleteCommentById } = require("../controllers/comments");
const authentication = require("../middleware/authentication");

const commentsRouter = express.Router();

//CURDs
commentsRouter.post("/", authentication, createComment);
commentsRouter.delete("/search_1/:id", authentication, deleteCommentById);

commentsRouter.use("*", (req, res) => {
  res.json("commentsRouter is working");
});

module.exports = commentsRouter;
