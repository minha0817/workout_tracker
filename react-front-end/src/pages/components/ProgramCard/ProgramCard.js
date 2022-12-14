import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePrograms } from "../../../App";
import ProgramForm from "./ProgramForm";
import {
  Box,
  Button,
  Card,
  Divider,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
// import { red, green } from "@mui/material/colors";

const ProgramAttribute = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function ProgramCard(props) {
  //Get a useOutletContext from App.js
  const { getAndSetPrograms } = usePrograms();
  //State for Name
  const [name, setName] = useState("");
  //State for Description
  const [description, setDescription] = useState("");
  //State for startdate
  const [startDate, setStartDate] = useState("");
  //State for enddate
  const [endDate, setEndDate] = useState("");

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  //If it has a value && one of the dependency is changed, it sets data.
  useEffect(() => {
    if (props.program.name) {
      setName(props.program.name);
    }

    if (props.program.description) {
      setDescription(props.program.description);
    }

    if (props.program.start_date) {
      setStartDate(props.program.start_date.substring(0, 10));
    }

    if (props.program.end_date) {
      setEndDate(props.program.end_date.substring(0, 10));
    }
  }, [
    props.program.name,
    props.program.description,
    props.program.start_date,
    props.program.end_date,
  ]);

  const editProgram = () => {
    const validationObject = {};

    validationObject.name = name ? "" : "Name - Required";
    validationObject.description = description ? "" : "Description - Required";
    validationObject.startDate = startDate ? "" : "Start Date - Required";
    validationObject.endDate = endDate ? "" : "End Date - Required";

    setErrorMessages({ ...errorMessages, ...validationObject });

    if (
      validationObject.name ||
      validationObject.description ||
      validationObject.startDate ||
      validationObject.endDate
    ) {
      return;
    }

    //Assemble program data object
    const requestData = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      user_id: 1,
    };
    //Send a request to put
    axios
      .put(`/api/programs/${props.program.id}`, requestData)
      .then(() => {
        getAndSetPrograms();
      })
      .catch((e) => {
        console.log(e);
      });

    //Set the editMode to false
    props.handleEditMode();
    //Get the lastest updated program list
    props.getProgram();
  };

  //Set the editmode to false
  const handleCancel = () => {
    props.handleEditMode();
  };

  //Setstate for name
  const nameCallback = (event) => {
    setName(event.target.value);
  };

  //Setstate for description
  const descriptionCallback = (event) => {
    setDescription(event.target.value);
  };

  //Setstate for startdate
  const startDateCallback = (value) => {
    setStartDate(value);
  };

  //Setstate for enddate
  const endDateCallback = (value) => {
    setEndDate(value);
  };


  return (
    <>
      {props.edit ? (
        <>
          <Card sx={{ width: "70%", minWidth: "380px" }}>
            <ProgramForm
              name={name}
              nameCallback={nameCallback}
              description={description}
              descriptionCallback={descriptionCallback}
              startDate={startDate}
              startDateCallback={startDateCallback}
              endDate={endDate}
              endDateCallback={endDateCallback}
              cancelCallback={handleCancel}
              saveCallback={editProgram}
              deleteCallback={props.handleDelete}
              errorMessages={errorMessages}
            />
          </Card>
        </>
      ) : (
        <>
          <Card sx={{ width: "70%", minWidth: "380px" }}>
            <CardContent
              sx={{
                display: "flex",
                pl: 1,
                pr: 1,
                fontSize: { xs: "1rem", sm: "1.5rem" },
                flexDirection: "column",
                paddingLeft: "20px",
              }}
            >
              <Box display="flex">
                <ProgramAttribute>
                  <Typography variant="h4"><b>{props.program.name}</b></Typography>
                </ProgramAttribute>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ marginLeft: "35px", marginRight: "35px" }}
                />
                <Box>
                  <Typography variant="h6">Start Date</Typography>
                  <Typography variant="h5">
                    {props.program.start_date
                      ? props.program.start_date.substring(0, 10)
                      : ""}
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ marginLeft: "35px", marginRight: "35px" }}
                />
                <Box>
                  <Typography variant="h6">End Date</Typography>
                  <Typography variant="p">
                    {props.program.end_date
                      ? props.program.end_date.substring(0, 10)
                      : ""}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="h6">Description</Typography>
                <Typography variant="p" sx={{ fontSize: "1rem" }}>
                  {props.program.description}
                </Typography>
              </Box>
            </CardContent>
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
            <CardActions disableSpacing>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                size="small"
                sx={{ ml: "auto" }}
                onClick={() => props.setEditMode(true)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
}
