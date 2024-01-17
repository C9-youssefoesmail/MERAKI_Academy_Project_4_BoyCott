import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { LoginContext } from "../../App";
import axios from "axios";
import { Alert, Button, Card, TextField } from "@mui/material";

const ContactUs = () => {
  //!----------------------useContext
  const { userId, setUserId, isLoggedIn } = useContext(LoginContext);

  if (!isLoggedIn) {
    setUserId("");
  }

  //!----------------------useState
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(false);

  //!----------------------getUserById
  const userIsExist = (id) => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => {
        console.log(result.data._result);
        setName(result.data._result.userName);
        setEmail(result.data._result.email);
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

  //!----------------------sendMessage
  const sendMessage = () => {
    if ((name, email, text)) {
      axios
        .post(`http://localhost:5000/contact`, newMessage)
        .then((result) => {
          console.log(result);
          setMessage(<Alert severity="success">Sent successfully.</Alert>);
          setHide(true);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    } else {
      setMessage(
        <Alert severity="info">please enter your name, email & Password.</Alert>
      );
      console.log("please enter your name, email & Password");
    }
  };

  //!----------------------newMessage
  const newMessage = { name, email, text };

  return (
    <div className="main">
      <Card elevation={4}>
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
            setText(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="bb">
        {hide === true ? (
          ""
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              sendMessage();
            }}
          >
            send
          </Button>
        )}
        {message ? <div className="message">{message}</div> : ""}
      </div>
      </Card>
      
    </div>
  );
};

export default ContactUs;
