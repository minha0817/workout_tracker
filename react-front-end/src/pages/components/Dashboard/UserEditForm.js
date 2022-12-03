import React, { useState } from "react";
import Axios from "axios";
import { Button, Container, Typography, Box, TextField, CardActions } from "@mui/material";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";


export const UserEditForm = (props) => {
  const [goal, setGoal] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [goalError, setGoalError] = useState(false);
  const [currentWeightError, setCurrentWeightError] = useState(false);
  const [goalWeightError, setGoalWeightError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentWeightError(false);
    setGoalError(false);
    setCurrentWeightError(false);
    if (goal === "") {
      setGoalError(true);
    }
    if (currentWeight === "") {
      setCurrentWeightError(true);
    }
    if (goalWeight === "") {
      setGoalWeightError(true);
    }
    if (goal && currentWeight && goalWeight) {
      const current_weight = Number(currentWeight);
      const goal_weight = Number(goalWeight);
      Axios.put(`/api/dashboard`, {
        goal,
        current_weight,
        goal_weight,
      })
        .then((result) => {
          props.getDashboard();
          props.showState(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    props.show && (
      <Container size="sm">
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Update Information
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setGoal(e.target.value)}
            id="goal"
            name="goal"
            label="Goal"
            variant="outlined"
            color="secondary"
            bordercolor="green"
            margin="normal"
            display="block"
            placeholder="Enter Goal"
            type="text"
            fullWidth
            value={goal}
            error={goalError}
            helperText={goalError === true ? "Goal -required" : ""}
          />
          <TextField
            onChange={(e) => setCurrentWeight(e.target.value)}
            label="Current Weight"
            id="current_weight"
            name="current_weight"
            margin="normal"
            display="block"
            variant="outlined"
            placeholder="Enter Current Weight"
            color="secondary"
            type="number"
            value={currentWeight}
            fullWidth
            error={currentWeightError}
            helperText={
              currentWeightError === true ? "Current Weight -required" : ""
            }
          />
          <TextField
            onChange={(e) => setGoalWeight(e.target.value)}
            label="Goal Weight"
            variant="outlined"
            id="goal_weight"
            name="goal_weight"
            margin="normal"
            display="block"
            placeholder="Enter Goal Weight"
            color="secondary"
            type="number"
            value={goalWeight}
            fullWidth
            error={goalWeightError}
            helperText={goalWeightError === true ? "Goal Weight -required" : ""}
          />
          <Box display="flex" justifyContent="flex-end" marginBottom={2} >
          <CardActions disableSpacing sx={{paddingRight: "0px"}}>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => props.showState(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ ml: "10px" }}
              startIcon={<SaveSharpIcon />}
            >
              Save
            </Button>
            </CardActions>
          </Box>
        </form>
      </Container>
    )
  );
};
