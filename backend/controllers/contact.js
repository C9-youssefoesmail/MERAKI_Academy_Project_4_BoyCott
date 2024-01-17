const contactModel = require("../models/contactSchema");

//createMessage
const createMessage = (req, res) => {
  const { name, email, text } = req.body;

  const newContact = new contactModel({
    name,
    email,
    text,
  });

  newContact
    .save()
    .then((result) => {
      res.send({
        success: true,
        message: "message created successfully",
        _message: result,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "something is wrong",
        error: err,
      });
    });
};

//deleteMessageById
const deleteMessageById = (req, res) => {
  const { id } = req.params;

  contactModel
    .findOneAndDelete({ _id: id })
    .then((result) => {
      res.send({
        success: true,
        message: "message deleted",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "something is wrong",
        error: err,
      });
    });
};

//getAllMessahes
const getAllMessages = (req,res) => {
  contactModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = {
  createMessage,
  deleteMessageById,
  getAllMessages,
};
