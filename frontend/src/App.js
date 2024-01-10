import "./App.css";
import Login from "./components/Login/Login";
import { Box, Button, Container, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import React, { useState, createContext } from "react";
import ProductItems from "./components/Items/ProductItems";
import Nav from "./components/Nav/Nav";
import Register from "./components/Register/Register";

export const LoginContext = createContext();

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  return (
    <LoginContext.Provider value={{ token, setToken, setIsLoggedIn, isLoggedIn }}>
      <div className="App">
        <Box>
          <Nav/>
          
          <Routes>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Home" element={<ProductItems/>}></Route>
        </Routes>
        </Box>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
