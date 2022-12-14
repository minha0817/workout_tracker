import React from "react";
import { Box, Button, TextField, IconButton, CardActions } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import DeleteIcon from "@mui/icons-material/Delete";

//ProgramForm for creating and editing program
export default function ProgramForm(props) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        // alignItems="center"
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            minWidth: "380",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          sx={{ mb: "2rem" }}
          label="Program Name"
          name="programName"
          type="text"
          placeholder="Enter Program Name"
          helperText={props.errorMessages.name ? props.errorMessages.name : ""}
          error={!!props.errorMessages.name}
          value={props.name}
          onChange={props.nameCallback}
        />

        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Description"
          multiline
          name="Description"
          type="text"
          placeholder="Enter Description"
          helperText={
            props.errorMessages.description
              ? props.errorMessages.description
              : ""
          }
          error={!!props.errorMessages.description}
          value={props.description}
          onChange={props.descriptionCallback}
        />

        <Box display="flex" justifyContent="space-between">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={props.startDate}
              onChange={props.startDateCallback}
              renderInput={(params) => (
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  {...params}
                  sx={{ width: "49%" }}
                  helperText={
                    props.errorMessages.startDate
                      ? props.errorMessages.startDate
                      : ""
                  }
                  error={!!props.errorMessages.startDate}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={props.endDate}
              onChange={props.endDateCallback}
              renderInput={(params) => (
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  {...params}
                  sx={{ width: "49%" }}
                  helperText={
                    props.errorMessages.endDate
                      ? props.errorMessages.endDate
                      : ""
                  }
                  error={!!props.errorMessages.endDate}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CardActions disableSpacing sx={{ pr: 0 }}>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={props.cancelCallback}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ ml: "10px" }}
              startIcon={<SaveSharpIcon />}
              onClick={props.saveCallback}
            >
              Save
            </Button>
            {props.deleteCallback ? (
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={props.deleteCallback}
              >
                <DeleteIcon />
              </IconButton>
            ) : null}
          </CardActions>
        </Box>
      </Box>
    </>
  );
}
