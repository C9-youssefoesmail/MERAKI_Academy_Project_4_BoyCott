import "./App.css";
import Login from "./components/Login/Login";
import { Box, Button, Container, Grid } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, createContext } from "react";
import ProductItems from "./components/Items/ProductItems";
import Nav from "./components/Nav/Nav";
import Register from "./components/Register/Register";
import Details from "./components/Details/Details";

//createContext
export const LoginContext = createContext();

//App Function
function App() {
  //useNavigate
  const navigate = useNavigate();

  //useState
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const [productDetails, setProductDetails] = useState()

  //return
  return (
    <LoginContext.Provider
      value={{ token, setToken, setIsLoggedIn, isLoggedIn, productDetails, setProductDetails }}
    >
      <div className="App">
        <Box>
          <Nav />
          <Routes>
            <Route path="/:id/Details" element={<Details />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/" element={<ProductItems />}></Route>
          </Routes>
        </Box>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
