import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//Register
const Register = () => {
  
  //password state
  const [showPassword, setShowPassword] = React.useState(false);

  //handleClickShowPassword
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //handleMouseDownPassword
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //useState
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mesage, setMesage] = useState("");

  //useNavigate
  const navigate = useNavigate();

  //role
  const role = "6599382ba982b05595b3556e";

  //newUser
  const newUser = { userName, email, password, role };

  //handleRegister
  const handleRegister = () => {
    if (email && password && userName) {
      axios
        .post("http://localhost:5000/users/register", newUser)
        .then((result) => {
          setMesage(result.data.message);
          navigate("/");
        })
        .catch((err) => {
          setMesage(err.response.data.message);
        });
    } else {
      setMesage("plz inter your email or passowrd or first name");
    }
  };

  //return
  return (
    <>
      <div className="Register">
        <p>Register:</p>
        <TextField id="outlined-textarea" label="user name" multiline required onChange={(e) => {
          setUserName(e.target.value);
        }}/>
        <TextField id="outlined-textarea" label="email" multiline required onChange={(e) => {
          setEmail(e.target.value);
        }}/>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
          <OutlinedInput
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
        <button
          className="button"
          onClick={() => {
            handleRegister();
          }}
        >
          Register
        </button>
        {mesage ? <p>{mesage}</p> : ""}
      </div>
    </>
  );
};

export default Register;
