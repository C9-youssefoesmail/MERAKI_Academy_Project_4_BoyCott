const roleModel = require("../models/roleSchema");

//createNewRole
const createNewRole = (req,res) => {
    const {role, permissions} = req.body;

    const newRole = new roleModel({
        role,
        permissions
    })
    newRole
    .save()
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "role created success",
            role: newRole
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success: false,
            massage: "Server error"
        })
    })
}

module.exports = {
    createNewRole
}