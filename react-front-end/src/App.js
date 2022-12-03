import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useOutletContext } from "react-router-dom";
import "./App.css";
import ResponsiveDrawer from "./pages/components/ResponsiveDrawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Helvetica", "Arial", "Tahoma", "sans-serif"].join(","),
    subtitle1: {
      fontFamily: ["Bayon", "Helvetica", "Arial", "Tahoma", "sans-serif"].join(
        ","
      ),
      fontSize: "2rem",
    },
  },
  palette: {
    primary: {
      light: "#3a6284",
      main: "#003857",
      dark: "#00122e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffbc58",
      main: "#ea8c26",
      dark: "#b25e00",
      contrastText: "#000",
    },
  },
});

export default function App() {
  const [programs, setPrograms] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const getAndSetPrograms = () => {
    axios
      .get("/api/programs")
      .then((result) => {
        setPrograms(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAndSetWorkouts = () => {
    axios
      .get("/api/workouts")
      .then((result) => {
        setWorkouts(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // When App initially loads, fetch data and store in state
  useEffect(() => {
    getAndSetPrograms();
    getAndSetWorkouts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveDrawer programs={programs} setPrograms={setPrograms}>
        <Outlet
          context={{
            programs,
            setPrograms,
            getAndSetPrograms,
            workouts,
            setWorkouts,
            getAndSetWorkouts,
          }}
        />
      </ResponsiveDrawer>
    </ThemeProvider>
  );
}

export function usePrograms() {
  return useOutletContext();
}
