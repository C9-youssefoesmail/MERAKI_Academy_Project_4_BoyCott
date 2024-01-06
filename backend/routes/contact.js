const express = require("express")

const {} = require("../controllers/contact")

const contactRouter = express.Router();

//CURDs

contactRouter.use("*",(req,res)=>{
    res.json("contactRouter is working")
})

module.exports = contactRouter;