const express = require("express")

const {register, login} = require("../controllers/users")

const usersRouter = express.Router();

//CURDs
usersRouter.post("/register", register);
usersRouter.post("/login",login);

usersRouter.use("*",(req,res)=>{
    res.json("usersRouter is working")
})

module.exports = usersRouter;