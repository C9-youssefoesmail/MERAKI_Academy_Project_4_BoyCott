const userModel = require("../models/userSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
const register = (req, res) => {
  const { userName, email, password, role } = req.body;

  const newUser = new userModel({
    userName,
    email,
    password,
    role, // role id
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        author: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    });
};

//login
const login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email: email.toLowerCase() })
    .populate("role")
    .then(async (result) => {
      if (!result) {
        res.status(403).json({
          success: false,
          massage:
            "The email doesn’t exist or the password you’ve entered is incorrect",
        });
      } else {
        const isValid = await bcrypt.compare(password, result.password);
        if (!isValid) {
          //password not found
          res.status(403).json({
            success: false,
            message:
              "The email doesn’t exist or the password you’ve entered is incorrect",
          });
        } else {
          const options = {
            expiresIn: "60m",
          };
          const payload = {
            userId: result._id,
            role: result.role,
          };
          const userToken = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: "Valid login",
            token: userToken,
            _role: result.role,
            _userId: result._id,
          });
        }
      }
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "something is wrong",
        error: err,
      });
    });
};

//deleteUserById
const deleteUserById = (req, res) => {
  const { id } = req.params;

  userModel
    .findOneAndDelete({ _id: id })
    .then(() => {
      res.send({
        success: true,
        message: "user deleted",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "there is error",
        error: err,
      });
    });
};

//getUserById
const getUserById = (req, res) => {
  const { id } = req.params;

  userModel
    .findById({ _id: id })
    .then((result) => {
      res.send({
        success: true,
        message: "user found",
        _result: result,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "there is error",
        error: err,
      });
    });
};

module.exports = {
  register,
  login,
  deleteUserById,
  getUserById,
};
