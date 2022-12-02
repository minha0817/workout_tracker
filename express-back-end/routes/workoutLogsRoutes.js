const Express = require('express');
const workoutLogQueries = require('../db/queries/workoutLogQueries');
const router = Express.Router();

// create the routes for the workout logs


router.get('/', (req,res) => {
  workoutLogQueries.getWorkOutLogsByUserId(1)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      err.message;
    })
});

router.post('/', (req,res) => {
  console.log("details", req.body)
  workoutLogQueries.addWorkoutLogs(req.body)
    .then(result => {
      console.log("backend", result);
      res.json(result);
    })
    .catch(err => {
      err.message;
    })
});



module.exports = router;