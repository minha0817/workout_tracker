import * as React from "react";
import { useNavigate, Link } from "react-router-dom";

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
        <Link to="/dashboard" className={"mainLogo"}>
          <Typography variant="subtitle1" sx={{ flexGrow: 100 }}>
            FitHub
          </Typography>
        </Link>
        <Avatar
          alt="User Avatar"
          src="images/pikachu.png"
          sx={{ mr: 1, ml: "auto" }}
        />
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
