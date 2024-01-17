const express = require("express");

const { createMessage, deleteMessageById, getAllMessages } = require("../controllers/contact");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const contactRouter = express.Router();

//CURDs
contactRouter.post("/", createMessage);
contactRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_MESSAGE"),
  deleteMessageById
);
contactRouter.get("/",getAllMessages)

contactRouter.use("*", (req, res) => {
  res.json("contactRouter is working");
});

module.exports = contactRouter;
