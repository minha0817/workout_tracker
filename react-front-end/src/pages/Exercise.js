import React from 'react';
import "./Exercise.css";

export default function Exercise (props) {
    return (
        <div className='exercise'>
          <h1>This is exercise page</h1>
          {/* <h1>{props.workout.name}</h1>
          <p>`This exercise targets {props.workout.muscle} and uses {props.workout.equipment} and the difficulty level {props.workout.difficulty}</p>
          <div></div>
          <p>instructions: {props.workout.instruction}</p> */}
        </div>
    )
};