import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Register
const Register = () => {
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
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
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
