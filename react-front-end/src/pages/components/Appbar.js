import * as React from "react";
import { Link } from "react-router-dom";

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
          src="https://images.unsplash.com/photo-1627693685101-687bf0eb1222?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          sx={{ mr: 1, ml: "auto" }}
        />
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
