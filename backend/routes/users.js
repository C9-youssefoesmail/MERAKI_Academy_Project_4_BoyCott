const express = require("express")

const {register} = require("../controllers/users")

const usersRouter = express.Router();

//CURDs
usersRouter.post("/register", register)

usersRouter.use("*",(req,res)=>{
    res.json("usersRouter is working")
})

module.exports = usersRouter;