import React from "react";

import { Box, IconButton } from "@mui/material";

import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function Buttons(props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      ml={"5px"}
    >
      <IconButton
        aria-label="increment"
        onClick={props.increment}
        sx={{ p: 0 }}
      >
        <KeyboardArrowUpRoundedIcon />
      </IconButton>

      <IconButton
        aria-label="decrement"
        onClick={props.value > 0 ? props.decrement : undefined}
        sx={{ p: 0 }}
      >
        <KeyboardArrowDownRoundedIcon />
      </IconButton>
    </Box>
  );
}
