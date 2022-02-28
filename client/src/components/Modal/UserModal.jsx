import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";

const Icon = styled.div``;

export const UserMobileModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const initials = () => {
    const fullName = user.firstname + " " + user.lastname;
    const firstLetters = fullName.match(/\b\w/g).join("");
    return firstLetters.toUpperCase();
  };
  return (
    <React.Fragment>
      <Icon>
        <Avatar
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            color: "#110f12",
            bgcolor: "white",
            width: 28,
            height: 28,
            fontSize: "12px",
          }}
        >
          {initials()}
        </Avatar>
      </Icon>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          style={{ transform: "scale(0.9)" }}
          onClick={() => {
            navigate("/account");
          }}
        >
          <ListItemIcon>
            <PersonOutlinedIcon />
          </ListItemIcon>
          Account
        </MenuItem>
        <MenuItem
          style={{ transform: "scale(0.9)" }}
          onClick={() => {
            navigate("/bag");
          }}
        >
          <ListItemIcon>
            <ShoppingBagOutlinedIcon />
          </ListItemIcon>
          Bag
        </MenuItem>
        <MenuItem
          style={{ transform: "scale(0.9)" }}
          onClick={() => {
            navigate("/orders");
          }}
        >
          <ListItemIcon>
            <PlaylistAddCheckOutlinedIcon />
          </ListItemIcon>
          Orders
        </MenuItem>
        <MenuItem
          style={{ transform: "scale(0.9)" }}
          onClick={() => {
            navigate("/wishlist");
          }}
        >
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon />
          </ListItemIcon>
          Wishlist
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ transform: "scale(0.9)" }}
          onClick={() => handleSignOut()}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export const UserModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const initials = () => {
    const fullName = user.firstname + " " + user.lastname;
    const firstLetters = fullName.match(/\b\w/g).join("");
    return firstLetters.toUpperCase();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };
  return (
    <React.Fragment>
      <Icon>
        <Avatar
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            color: "#110f12",
            bgcolor: "white",
            width: 38,
            height: 38,
            fontSize: "14px",
          }}
        >
          {initials()}
        </Avatar>
      </Icon>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2,
            "& .MuiAvatar-root": {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          style={{ transform: "scale(0.9)" }}
          onClick={() => {
            navigate("/account");
          }}
        >
          <ListItemIcon>
            <PersonOutlinedIcon />
          </ListItemIcon>
          Account
        </MenuItem>
        <MenuItem
          style={{ transform: "scale(0.9)" }}
          onClick={() => {
            navigate("/orders");
          }}
        >
          <ListItemIcon>
            <PlaylistAddCheckOutlinedIcon />
          </ListItemIcon>
          Orders
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() => handleSignOut()}
          style={{ transform: "scale(0.9)" }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
