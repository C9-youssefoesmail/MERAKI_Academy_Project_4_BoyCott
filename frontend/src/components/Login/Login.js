import axios from "axios";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//the Login Function
const Login = () => {
  //password state
  const [showPassword, setShowPassword] = React.useState(false);

  //handleClickShowPassword
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //handleMouseDownPassword
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //useState
  const { token, setToken, setIsLoggedIn, setUserStatus, setUserId } =
    useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const userInfo = { email, password };
  const navigate = useNavigate();

  //handleLogin
  const handleLogin = () => {
    console.log("handleLogin");
    if ((email, password)) {
      axios
        .post("http://localhost:5000/users/login", userInfo) //userInfo
        .then((result) => {
          console.log(result.data.token);
          console.log(result.data._role.role);
          console.log(result.data._userId);
          setUserId(result.data._userId);
          setUserStatus(result.data._role.role);
          setToken(result.data.token);
          setIsLoggedIn(true);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userStatus", result.data._role.role);
          localStorage.setItem("userId", result.data._userId);
          navigate("/");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    } else {
      setMessage(<Alert severity="error">please enter your email and password.</Alert>);
    }
  };

  //return
  return (
    <div className="Login">
      <p>Login:</p>
      <TextField
        id="outlined-textarea"
        label="email"
        multiline
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <div>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
          onClick={() => {
            navigate("/Register");
          }}
        >
          i don't have account
        </Button>
      </div>
      {message ? <p>{message}</p> : ""}
    </div>
  );
};
export default Login;
