const express = require("express")

const {createMessage} = require("../controllers/contact")

const contactRouter = express.Router();

//CURDs
contactRouter.post("/",createMessage)

contactRouter.use("*",(req,res)=>{
    res.json("contactRouter is working")
})

module.exports = contactRouter;