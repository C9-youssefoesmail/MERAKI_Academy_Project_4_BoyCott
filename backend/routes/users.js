const express = require("express")

const {} = require("../controllers/users")

const usersRouter = express.Router();

//CURDs

usersRouter.use("*",(req,res)=>{
    res.json("usersRouter is working")
})

module.exports = usersRouter;