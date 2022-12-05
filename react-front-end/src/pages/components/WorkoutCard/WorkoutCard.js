import React, { useState } from "react";

import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import WorkoutForm from "./WorkoutForm";

//Show a workout card
export default function WorkoutCard(props) {
  //State for editWorkoutMode
  const [editWorkoutMode, setEditWorkoutMode] = useState(false);

  //Set editWorkoutMode to false
  const cancelEdit = () => {
    setEditWorkoutMode(false);
  };

  const navigate = useNavigate();

  //Redirect to workout pages
  const handleNavigate = () => {
    navigate(`/workout/${props.workout.id}`);
  };

  return (
    <>
      {editWorkoutMode ? (
        <WorkoutForm
          edit={editWorkoutMode}
          cancelEdit={cancelEdit}
          workout={props.workout}
          getWorkout={props.getWorkout}
        />
      ) : (
        <>
          <div className="workoutListItem" onClick={handleNavigate}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={props.workout.image}
                  alt={props.workout.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {props.workout.name}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Duration : {props.workout.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {props.workout.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    size="small"
                    sx={{ ml: "auto" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      setEditWorkoutMode(true);
                    }}
                  >
                    Edit
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
