import axios from "axios";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";

//the Login Function
const Login = () => {
  
  //useState
  const { token, setToken, setIsLoggedIn, setUserStatus, setUserId } = useContext(LoginContext);
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
          console.log(result.data._role.role);
          console.log(result.data._userId);
          setUserId(result.data._userId)
          setUserStatus(result.data._role.role)
          setToken(result.data.token);
          setIsLoggedIn(true);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userStatus", result.data._role.role);
          localStorage.setItem("userId", result.data._userId)
          navigate("/");
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
