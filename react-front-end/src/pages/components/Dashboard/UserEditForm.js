import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import {
  Button,
  Container,
  Typography,
} from "@mui/material";


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

    return ( props.show &&
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
            margin="normal"
            display="block"
            type="text"
            required
            fullWidth
            value={goal}
            error={goalError}
          />
          <TextField
            onChange={(e) => setCurrentWeight(e.target.value)}
            label="Current Weight"
            id="current_weight"
            name="current_weight"
            margin="normal"
            display="block"
            required
            variant="outlined"
            color="secondary"
            type="number"
            value={currentWeight}
            fullWidth
            error={currentWeightError}
          />
          <TextField
            onChange={(e) => setGoalWeight(e.target.value)}
            label="Goal Weight"
            variant="outlined"
            required
            id="goal_weight"
            name="goal_weight"
            margin="normal"
            display="block"
            color="secondary"
            type="number"
            value={goalWeight}
            fullWidth
            error={goalWeightError}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            sx={{ ml: "auto" }}
          >
            Save
          </Button>
        </form>
      </Container>
    );
};
