const express = require("express")

const {} = require("../controllers/products")

const productsRouter = express.Router();

//CURDs

productsRouter.use("*",(req,res)=>{
    res.json("productsRouter is working")
})

module.exports = productsRouter;