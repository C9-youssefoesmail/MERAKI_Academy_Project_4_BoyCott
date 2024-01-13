import axios from "axios";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";

//the Login Function
const Login = () => {
  
  //useState
  const { token, setToken, setIsLoggedIn } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const userInfo = { email, password };
  const navigate = useNavigate();

  //handleLogin
  const handleLogin = () => {
    if ((email, password)) {
      axios
        .post("http://localhost:5000/users/login", userInfo) //userInfo
        .then((result) => {
          console.log(result.data.token);
          setToken(result.data.token);
          setIsLoggedIn(true);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("isLoggedIn", true);
          navigate("/Home");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    } else {
      setMessage("plz add email and password");
    }
  };

  //return
  return (
    <div className="Login">
      <p>Login:</p>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="button"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
      {message ? <p>{message}</p> : ""}
    </div>
  );
};
export default Login;