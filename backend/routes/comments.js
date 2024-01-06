const express = require("express")

const {} = require("../controllers/comments")

const commentsRouter = express.Router();

//CURDs

commentsRouter.use("*",(req,res)=>{
    res.json("commentsRouter is working")
})

module.exports = commentsRouter;