const express = require("express")

const {createMessage, deleteMessageById} = require("../controllers/contact")

const contactRouter = express.Router();

//CURDs
contactRouter.post("/",createMessage)
contactRouter.delete("/:id",deleteMessageById)

contactRouter.use("*",(req,res)=>{
    res.json("contactRouter is working")
})

module.exports = contactRouter;