import "./App.css";
import Login from "./components/Login/Login";
import { Box, Button, Container, Grid } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, createContext } from "react";
import ProductItems from "./components/Items/ProductItems";
import Nav from "./components/Nav/Nav";
import Register from "./components/Register/Register";
import Details from "./components/Details/Details";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ContactUs from "./components/ContactUs/ContactUs";
import Messages from "./components/Messages/Messages";

//createContext
export const LoginContext = createContext();

//App Function
function App() {
  //useNavigate
  const navigate = useNavigate();

  //useState
  const [token, setToken] = useState(localStorage.getItem("token") || []);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [userStatus, setUserStatus] = useState(
    localStorage.getItem("userStatus") || ""
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [isTrue, setIsTrue] = useState(true);
  const [isFalse, setIsFalse] = useState(false);

  //return
  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
        setIsLoggedIn,
        isLoggedIn,
        userStatus,
        setUserStatus,
        userId,
        setUserId,
        isTrue,
        setIsTrue,
        isFalse,
        setIsFalse,
      }}
    >
      <div className="App">
        <Nav />
        <Container>
          <Box>
            <Routes>
              <Route path="/:id/Details" element={<Details />}></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/" element={<ProductItems />}></Route>
              <Route path="/CreateProduct" element={<CreateProduct />}></Route>
              <Route path="/contactUs" element={<ContactUs/>}></Route>
              <Route path="/messages" element={<Messages/>}></Route>
            </Routes>
          </Box>
        </Container>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
