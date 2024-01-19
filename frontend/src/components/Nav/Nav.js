import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoginContext } from "../../App";
import EmailIcon from "@mui/icons-material/Email";
import "./style.css";

//!----------styled
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  alignItems: "center",
}));

const Nav = () => {
  //!---------------useState
  const [safe, setSafe] = useState("");

  //!---------------useContext
  const {
    isLoggedIn,
    setToken,
    setIsLoggedIn,
    setUserStatus,
    userStatus,
    setIsTrue,
    setIsFalse,
  } = useContext(LoginContext);

  const handleChange = (event) => {
    setSafe(event.target.value);
    if (event.target.value === "all") {
      setIsTrue(true);
      setIsFalse(false);
    } else if (event.target.value === "boycott") {
      setIsTrue(false);
      setIsFalse(false);
    } else if (event.target.value === "opposite") {
      setIsTrue(true);
      setIsFalse(true);
    }
  };

  //const navigate = useNavigate()
  //!--------------return
  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar className="navbar">
          <Typography>
            <Link to="/">
              <Button variant="contained">Home</Button>
            </Link>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={safe}
                label="product"
                onChange={handleChange}
              >
                <MenuItem value={"all"}>all</MenuItem>
                <MenuItem value={"boycott"}>boycott</MenuItem>
                <MenuItem value={"opposite"}>opposite</MenuItem>
              </Select>
            </FormControl>
          </Typography>
          {isLoggedIn ? (
            <Icons>
              <ButtonGroup variant="contained">
                {userStatus === "admin" ? (
                  <>
                    <Link to="/messages">
                      <EmailIcon fontSize="large" color="action"/>
                    </Link>
                    <Link to="/CreateProduct">
                      <Button>Create Product</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/contactUs">
                    <Button>contact us</Button>
                  </Link>
                )}
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("userStatus");
                    localStorage.removeItem("userId");
                    setToken("");
                    setIsLoggedIn(false);
                    setUserStatus("");
                  }}
                >
                  <Button>Logout</Button>
                </Link>
              </ButtonGroup>
            </Icons>
          ) : (
            <Icons>
              <ButtonGroup variant="contained">
                <Link to="/contactUs">
                  <Button>contact us</Button>
                </Link>
                <Link to="/Login">
                  <Button>Login</Button>
                </Link>
                <Link to="/Register">
                  <Button>Register</Button>
                </Link>
              </ButtonGroup>
            </Icons>
          )}
        </StyledToolbar>
      </AppBar>
    </>
  );
};

export default Nav;

// localStorage.setItem("userStatus", result.data._role.role);
// localStorage.setItem("userId", result.data._userId)
