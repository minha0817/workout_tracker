import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePrograms } from "../../../App";
import ProgramForm from "./ProgramForm";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

    validationObject.name = name ? "" : "Name - required";
    validationObject.description = description ? "" : "Description - required";
    validationObject.startDate = startDate ? "" : "Start Date - required";
    validationObject.endDate = endDate ? "" : "End Date - required";

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
        <ProgramForm
          name={name}
          nameCallback={nameCallback}
          description={description}
          descriptionCallback={descriptionCallback}
          startDate={startDate}
          startDateCallback={startDateCallback}
          endDate={endDate}
          endDateCallback={endDateCallback}
          cancel={handleCancel}
          save={editProgram}
          errorMessages={errorMessages}
        />
      ) : (
        <>
          <Card>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
            >
              <CardContent>
                <Typography variant="h5">{props.program.name}</Typography>
                <Typography variant="p">
                  Start date :{" "}
                  {props.program.start_date
                    ? props.program.start_date.substring(0, 10)
                    : ""}
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography variant="p">
                  End date :{" "}
                  {props.program.end_date
                    ? props.program.end_date.substring(0, 10)
                    : ""}
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography variant="p">
                  Note : {props.program.description}
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
              </CardContent>
            </Box>
            {props.edit ? (
              <>
                <DeleteIcon
                  size="large"
                  color="error"
                  onClick={props.handleDelete}
                />
              </>
            ) : (
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
            )}
          </Card>
        </>
      )}
    </>
  );
}
