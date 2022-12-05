import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Appbar(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${props.drawerWidth}px)` },
        ml: { md: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="subtitle1"
          sx={{ flexGrow: 100 }}
          onClick={handleClick}
        >
          FitHub
        </Typography>

        <Avatar alt="User Avatar" src="images/pikachu.png" sx={{ mr: 1 }} />
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
