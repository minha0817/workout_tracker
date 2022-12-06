const Express = require('express');
const workoutLogQueries = require('../db/queries/workoutLogQueries');
const router = Express.Router();

// create the routes for the workout logs

//Read - Get all workOut logs for a user
router.get('/', (req,res) => {
  workoutLogQueries.getWorkOutLogsByUserId(1)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      err.message;
    })
});
// Create - Add too Workout Logs
router.post('/', (req,res) => {
  workoutLogQueries.addWorkoutLogs(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      err.message;
    })
});



module.exports = router;