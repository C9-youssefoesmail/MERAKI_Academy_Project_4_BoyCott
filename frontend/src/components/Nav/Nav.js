import React, { useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ModeNight, Notifications } from "@mui/icons-material";
import { LoginContext } from "../../App";
import "./style.css";

//!----------styled
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  width: "20%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  alignItems: "center",
}));

const Nav = () => {
  //!---------------useContext
  const { isLoggedIn, setToken, setIsLoggedIn, setUserStatus, userStatus } = useContext(LoginContext);

  //!---------------useState
  const [open, setOpen] = useState(false);

  //const navigate = useNavigate()
  //!--------------return
  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography>
            <Link to="/">
              <Button variant="contained">
                Home
              </Button>
            </Link>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href=""
                sx={{
                  backgroundColor: "#aaa",
                  color: "#aaa",
                  opacity: "0.5",
                }}
              >
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch />
              </ListItemButton>
            </ListItem>
          </Typography>

          <Search>
            <InputBase placeholder="search" />
          </Search>
          {isLoggedIn ? (
            <Icons>
              <Badge badgeContent={4}>
                <Mail />
              </Badge>
              <Badge badgeContent={2}>
                <Notifications />
              </Badge>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src=""
                onClick={(e) => setOpen(true)}
              />
            </Icons>
          ) : (
            <Icons>
              <Link to="/Login">Login</Link>
              <Link to="/Register">Register</Link>
            </Icons>
          )}
        </StyledToolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClick={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <Link to="/Profile">Profile</Link>
          </MenuItem>
          {userStatus === "admin" ? <MenuItem>
            <Link to="/CreateProduct">Create Product</Link>
          </MenuItem> : ""}
          <MenuItem>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userStatus");
                localStorage.removeItem("userId")
                setToken("");
                setIsLoggedIn(false);
                setUserStatus("")
              }}
            >
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Nav;

// localStorage.setItem("userStatus", result.data._role.role);
// localStorage.setItem("userId", result.data._userId)
