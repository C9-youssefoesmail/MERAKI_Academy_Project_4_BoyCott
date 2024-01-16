import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoginContext } from "../../App";
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
  //!---------------useContext
  const { isLoggedIn, setToken, setIsLoggedIn, setUserStatus, userStatus } =
    useContext(LoginContext);

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
          </Typography>
          {isLoggedIn ? (
            <Icons>
              <ButtonGroup variant="contained">
                <Link to="/Profile">
                  <Button>Profile</Button>
                </Link>
                {userStatus === "admin" ? (
                  <Link to="/CreateProduct">
                    <Button>Create Product</Button>
                  </Link>
                ) : null}
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
