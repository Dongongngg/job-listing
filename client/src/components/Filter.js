import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    textAlign: "center",
    "@media (max-width: 780px)": {
      padding: "0.5rem",
    },
  },
});

const MyInput = withStyles({
  root: {
    width: "100%",
    borderRadius: "30px",
    boxShadow: "0px 4px 10px -3px rgba(0,0,0,0.3)",
    backgroundColor: "white",
    height: "5vh",
    "@media (max-width: 780px)": {
      height: "3.5vh",
    },

    "& input": {
      paddingLeft: "1rem",
    },
  },
})(InputBase);

export default function Filter() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MyInput
        id="filter"
        placeholder="Filter"
        inputProps={{ "aria-label": "Filter" }}
      />
    </div>
  );
}
