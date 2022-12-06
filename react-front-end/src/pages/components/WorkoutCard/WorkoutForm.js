import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  Button,
  Box,
  TextField,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Tooltip,
  Link,
} from "@mui/material";
import Axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Confirmation from "../Confirmation";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

//A form for creating, editing workout
export default function WorkoutForm(props) {
  //Assemble workout data object.
  //If it's editing, there is a workout
  //If it's creating, there is no workout
  const [state, setState] = useState({
    name: props.workout ? props.workout.name : "",
    program_id: props.workout ? props.workout.program_id : props.programId,
    description: props.workout ? props.workout.description : "",
    duration: props.workout ? props.workout.duration : null,
    image: props.workout ? props.workout.image : "",
  });

  //State for errors
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const checkAllErrors = () => {
    setNameError(false);
    setDescriptionError(false);
    setDurationError(false);
    setImageError(false);

    if (state.name && state.description && state.duration && state.image) {
      return true;
    }

    if (!state.name) {
      setNameError("Name - required");
    }
    if (!state.description) {
      setDescriptionError("Description - required");
    }

    if (!state.duration) {
      setDurationError("Duration - Number required");
    }

    if (!state.image) {
      setImageError("Image - required");
    }

    return false;
  };

  //State for Confirm modal.
  const [confirmOpen, setConfirmOpen] = useState(false);

  //Setstate for Name
  const nameCallback = (event) => {
    return setState({ ...state, name: event.target.value });
  };

  //Setstate for Duration
  const durationCallback = (event) => {
    return setState({ ...state, duration: event.target.value });
  };

  //Setstate for image
  const imageCallback = (event) => {
    return setState({ ...state, image: event.target.value });
  };

  //Setstate for description
  const descriptionCallback = (event) => {
    return setState({ ...state, description: event.target.value });
  };

  //Handle Save workout
  const saveWorkout = () => {
    return props.edit ? editWorkout() : createWorkout();
  };

  //Handle cancel
  const handleCancel = () => {
    return props.edit ? props.cancelEdit() : props.cancelCreate();
  };

  //Send a request to put workout
  const editWorkout = () => {
    // checkAllErrors(); //false
    if (checkAllErrors()) {
      Axios.put(`/api/workouts/${props.workout.id}`, state)
        .then((result) => {
          props.cancelEdit();
          props.getWorkout();
        })
        .catch((e) => console.log(e));
    }
  };

  //Send a request to create workout
  const createWorkout = () => {
    if (checkAllErrors()) {
      Axios.post(`/api/workouts`, state)
        .then((result) => {
          props.cancelCreate();
          props.getWorkout();
        })
        .catch((e) => console.log(e));
    }
  };

  //Send a request to delete workout
  const handleDelete = () => {
    Axios.delete(`/api/workouts/${props.workout.id}`)
      .then((result) => {
        props.cancelEdit();
        props.getWorkout();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Card display="flex" sx={{ width: "70%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            // alignItems: "center",
          }}
        >
          <CardContent>
            {/* <Typography variant="h5">Workout title</Typography> */}
            <div>
              <TextField
                id="outlined-basic"
                label="Workout Name"
                variant="outlined"
                type="text"
                multiline
                fullWidth
                value={state.name || ""}
                onChange={nameCallback}
                sx={{ mb: "2rem" }}
                // sx={{ maxWidth: "80%", overflow: "visible" }}
                helperText={nameError ? nameError : ""}
                error={!!nameError}
              />
            </div>

            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                sx={{ mb: "2rem" }}
                label="Duration"
                type="number"
                // placeholder={state.duration}
                value={state.duration || ""}
                InputProps={{
                  inputProps: { min: 0 },
                }}
                onChange={durationCallback}
                helperText={durationError ? durationError : ""}
                error={!!durationError}
              />
            </div>

            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                sx={{ mb: "2rem" }}
                label="Description"
                name="Workout description"
                type="text"
                placeholder={state.description || ""}
                multiline
                value={state.description}
                onChange={descriptionCallback}
                helperText={descriptionError ? descriptionError : ""}
                error={!!descriptionError}
              />
            </div>

            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                sx={{ mb: "2rem" }}
                label="URL"
                type="text"
                placeholder={state.image}
                multiline
                value={state.image || ""}
                onChange={imageCallback}
                helperText={imageError ? imageError : ""}
                error={!!imageError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ position: "relative", top: "4px" }}
                    >
                      <Link
                        href="https://www.pexels.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Tooltip title="Pexels.com" arrow placement="right">
                          <CameraAltRoundedIcon />
                        </Tooltip>
                      </Link>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <CardActions disableSpacing>
              <Button
                color="secondary"
                size="small"
                sx={{ ml: "auto" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                size="small"
                startIcon={<SaveSharpIcon />}
                sx={{ ml: "auto", margin: "10px" }}
                onClick={saveWorkout}
              >
                Save
              </Button>

              {props.edit ? (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => {
                    setConfirmOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
              {confirmOpen ? (
                <Confirmation
                  confirmOpen={confirmOpen}
                  setConfirmOpen={setConfirmOpen}
                  confirmDelete={handleDelete}
                  resource={"workout"}
                />
              ) : null}
            </CardActions>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
