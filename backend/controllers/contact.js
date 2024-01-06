const contactModel = require("../models/contactSchema");

//createMessage 
const createMessage = (req,res) => {
    const {name, email, text} = req.body;

    const newContact = new contactModel({
        name,
        email,
        text
    })

    newContact
    .save()
    .then((result)=>{
        res.send({
            success: true,
            message: "message created successfully",
            _message: result
        })
    })
    .catch((err)=>{
        res.send({
            success: false,
            message: "something is wrong",
            error: err
        })
    })
}

//deleteMessageById


module.exports = {
    createMessage,
}