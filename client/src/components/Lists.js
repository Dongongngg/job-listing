import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    "@media (max-width: 780px)": {
      padding: "1rem",
    },
  },
  paper: {
    backgroundColor: "#01579B",
    height: "7.5vh",
    width: "100%",
    padding: "0.5rem",
    "@media (max-width: 780px)": {
      padding: "0.5rem",
    },
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  listLeft: {
    maxWidth: "45%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: "calc(10px + 0.5vw)",
  },
  listMid: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: "calc(15px + 0.5vw)",
  },
  listState: {
    borderRadius: "20px",
    height: "5vh",
    width: "10vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  state: {
    "@media (max-width: 780px)": {
      fontSize: "calc(10px + 0.3vw) !important",
    },
  },
  listControl: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const SmTypography = withStyles({
  root: {
    fontSize: "calc(10px + 0.3vw)",
    fontWeight: "500",
    "@media (max-width: 780px)": {
      lineHeight: 1,
    },
  },
})(Typography);

const MdTypography = withStyles({
  root: {
    fontSize: "calc(10px + 0.3vw)",
    fontWeight: "500",
    "@media (max-width: 780px)": {
      lineHeight: 1,
    },
  },
})(Typography);

const LgTypography = withStyles({
  root: {
    fontSize: "calc(17px + 0.3vw)",
    fontWeight: "600",
    "@media (max-width: 780px)": {
      lineHeight: 1.25,
    },
  },
})(Typography);

export default function Lists(props) {
  const { jobTitle, companyName, submitDate, source, jobState } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={5}>
        <div className={classes.listLeft}>
          <LgTypography>{jobTitle}</LgTypography>
          <SmTypography>{companyName}</SmTypography>
        </div>
        <div className={classes.listMid}>
          <MdTypography>{submitDate}</MdTypography>
          <LgTypography>{source}</LgTypography>
        </div>
        <div
          className={classes.listState}
          style={{
            backgroundColor:
              jobState === "Submit"
                ? "#00BCD4"
                : jobState === "Interview"
                ? "#8BC34A"
                : jobState === "Test"
                ? "#FFC107"
                : null,
          }}
        >
          <LgTypography className={classes.state}>{jobState}</LgTypography>
        </div>
        <div className={classes.listControl}>
          <button>x</button>
          <button>Edit</button>
        </div>
      </Paper>
    </div>
  );
}
