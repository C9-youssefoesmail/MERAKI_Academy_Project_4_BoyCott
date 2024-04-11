const express = require("express");

const { register, login, deleteUserById, getUserById } = require("../controllers/users");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const usersRouter = express.Router();

//CURDs
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_USER"),
  deleteUserById
);
usersRouter.get("/:id", getUserById)

usersRouter.use("*", (req, res) => {
  res.json("usersRouter is working");
});

module.exports = usersRouter;
//