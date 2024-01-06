const express = require("express")

const {createComment} = require("../controllers/comments");
const authentication = require("../middleware/authentication");

const commentsRouter = express.Router();

//CURDs
commentsRouter.post("/",authentication,createComment);

commentsRouter.use("*",(req,res)=>{
    res.json("commentsRouter is working")
})

module.exports = commentsRouter;