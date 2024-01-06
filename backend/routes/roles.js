const express = require("express");

const { createNewRole } = require("../controllers/roles");

const rolesRouter = express.Router();

//CURDs
rolesRouter.post("/", createNewRole);

rolesRouter.use("*", (req, res) => {
  res.json("rolesRouter is working");
});

module.exports = rolesRouter;
