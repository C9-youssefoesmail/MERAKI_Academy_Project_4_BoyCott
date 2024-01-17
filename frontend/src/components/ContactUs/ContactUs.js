import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { LoginContext } from "../../App";
import axios from "axios";
import {
  TextField,
} from "@mui/material";

const ContactUs = () => {
  //!----------------------useContext
  const { userId, setUserId, isLoggedIn } = useContext(LoginContext);

  if(!isLoggedIn)
  {
    setUserId("")
  }

  //!----------------------useState
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //!----------------------getUserById
  const userIsExist = (id) => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => {
        console.log(result.data._result);
        setName(result.data._result.userName)
        setEmail(result.data._result.email)
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //!----------------------useEffect
  useEffect(() => {
    if (userId) {
      console.log(userId);
      userIsExist(userId);
    }
  }, []);

  return (
    <div className="main">
      <div className="Contact">Contact Us:</div>
      {userId ? (
        <div className="user">
          <p>User name: {name}</p>
          <p>Email: {email}</p>
        </div>
      ) : (
        <div className="user">
          <TextField
            id="outlined-textarea"
            label="user name"
            multiline
            required
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />
          <TextField
            sx={{ marginLeft: "1%" }}
            id="outlined-textarea"
            label="email"
            multiline
            required
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
      )}
      <div>
        <TextField
          sx={{ margin: "10px" }}
          id="filled-multiline-static"
          label="message"
          multiline
          rows={12}
          variant="filled"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ContactUs;
