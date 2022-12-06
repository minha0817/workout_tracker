import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import {
  Box,
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  IconButton,
} from "@mui/material";

import Appbar from "./Appbar";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  // Toggling drawer state and menu button click handler
  const [mobileOpen, setMobileOpen] = useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Expanding list item state and click handler
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const drawerItems = (
    <div>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* Dashboard */}
        <Link to="/dashboard" className={"programListItem"}>
          <ListItemButton>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </Link>

        {/* Programs */}
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary={"Programs"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Add New Program */}
            <Link to={"/program/new"} className={"programListItem"}>
              <ListItemButton sx={{ pl: 4, pr: 1 }}>
                <ListItemText primary={"Add New Program"} />
                <IconButton sx={{ pl: 1 }}>
                  <AddCircleOutlineRoundedIcon />
                </IconButton>
              </ListItemButton>
            </Link>

            {/* Array of programs */}
            {props.programs.map((program) => (
              <Link
                to={`/program/${program.id}`}
                className={"programListItem"}
                key={program.id}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={program.name} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      <Appbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
      />

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="workout app navigation"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerItems}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerItems}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
          flex: 1,
          maxheight: "100%",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
