import React from "react";
import { Button, Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";

//ProgramForm for creating and editing program
export default function ProgramForm(props) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            maxWidth: "50%",
            minWidth: "30%",
            width: "30%",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
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
          fullWidth
          label="Description"
          multiline
          name="Description"
          type="text"
          placeholder="Enter Description"
          helperText={props.errorMessages.description ? props.errorMessages.description : ""}
          error={!!props.errorMessages.description}
          value={props.description}
          onChange={props.descriptionCallback}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={props.startDate}
            onChange={props.startDateCallback}
            renderInput={(params) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                helperText={props.errorMessages.startDate ? props.errorMessages.startDate : ""}
                error={!!props.errorMessages.startDate}
                {...params}
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
                helperText={props.errorMessages.endDate ? props.errorMessages.endDate : ""}
                error={!!props.errorMessages.endDate}
                fullWidth
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{ "& button": { m: 1 } }}>
        <Button color="secondary" size="small" onClick={props.cancel}>
          Cancel
        </Button>

        <Button
          variant="contained"
          // color="success"
          size="small"
          sx={{ ml: "auto" }}
          startIcon={<SaveSharpIcon />}
          onClick={props.save}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
