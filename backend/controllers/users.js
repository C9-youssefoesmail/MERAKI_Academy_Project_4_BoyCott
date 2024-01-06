const userModel = require("../models/userSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register 
const register = (req,res) => {
    const {userName, email, password, role} = req.body;

    const newUser = new userModel({
        userName,
        email,
        password,
        role,// role id
    })
    newUser
    .save()
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            author: result
        })
    })
    .catch((err)=>{
        res.status(409).json({
            success: false,
            message: "The email already exists"
        })
    })
}

//login


//deleteUserById


module.exports = {
    register,
    
}