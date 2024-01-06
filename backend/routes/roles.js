const express = require("express")

const {} = require("../controllers/roles")

const rolesRouter = express.Router();

//CURDs

rolesRouter.use("*",(req,res)=>{
    res.json("rolesRouter is working")
})

module.exports = rolesRouter;