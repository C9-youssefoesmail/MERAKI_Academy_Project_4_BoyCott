import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import { LoginContext } from "../../App";

//!----------------------styled
const Item = styled(Paper)(({ theme }) => ({
  marginTop: "1%",
  marginLeft: "1%",
  marginRight: "1%",
  backgroundColor: "rgba(193, 233, 186, 0.222)",
}));

//!----------------Messages
const Messages = () => {
  //
  //
  //!----------------------useContext
  const { token } = useContext(LoginContext);

  //!----------------useState
  const [contacts, setContacts] = useState([]);

  //!----------------contactMessages
  const contactMessages = () => {
    axios
      .get(`https://meraki-academy-project-4-boycott-2.onrender.com/contact`)
      .then((result) => {
        console.log(result.data);
        setContacts(result.data);
      })
      .catch((err) => {
        console.log("error => ", err);
      });
  };

  //!----------------deleteMessage
  const deleteMessage = (id) => {
    axios.delete(`https://meraki-academy-project-4-boycott-2.onrender.com/contact/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((result)=>{
        console.log("Deleted");
        contactMessages();
    })
    .catch((err)=>{
        console.log("error => ",err);
    })
  };

  //!----------------useEffect
  useEffect(() => {
    contactMessages();
  }, []);

  //!----------------return
  return (
    <div>
      {contacts.map((message, i) => {
        return (
          <>
            <Box flex={1} p={1}>
              <Grid item xs={4}>
                <Item elevation={3}>
                  {message.name}
                  <br />
                  {message.email}
                  <br />
                  {message.text}
                  <br />
                  <Button
                    sx={{
                      width: "10%",
                      marginLeft: "80%",
                      marginBottom: "2%",
                    }}
                    variant="contained"
                    color="error"
                    onClick={() => {
                      console.log("Delete", message._id);
                      deleteMessage(message._id);
                    }}
                  >
                    Delete
                  </Button>
                </Item>
              </Grid>
            </Box>
          </>
        );
      })}
    </div>
  );
};

export default Messages;
