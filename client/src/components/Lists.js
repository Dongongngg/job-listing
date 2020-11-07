import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import SettingsIcon from "@material-ui/icons/Settings";

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
    background: "rgb(2,0,36)",
    background:
      "linear-gradient(33deg, rgb(75 75 196) 20%, rgb(0 166 200) 90%)",
    height: "8vh",
    width: "100%",
    padding: "0.5rem",
    borderRadius: "1rem",
    "@media (max-width: 780px)": {
      padding: "0.5rem",
    },
    position: "relative",
    color: "white",
  },
  listLeft: {
    height: "8vh",
    maxWidth: "33%",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: "calc(10px + 0.5vw)",
  },
  listMid: {
    height: "8vh",
    position: "absolute",
    left: "38%",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: "calc(15px + 0.5vw)",
  },
  listState: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8vh",
    right: "15%",
    position: "absolute",
    minWidth: "20%",
  },
  stateBox: {
    textAlign: "center",
    backgroundColor: (props) => props.stateColor,
    borderRadius: "0.5rem",
  },
  state: {
    padding: "0.5rem",
    "@media (max-width: 780px)": {
      fontSize: "calc(12px + 0.3vw) !important",
      padding: "0.25rem",
    },
  },
  listControl: {
    height: "8vh",
    position: "absolute",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between",
    right: "0.5rem",
  },
  icon: {
    cursor: "pointer",
    transition: "0.5s all",
    "@media (max-width: 780px)": {
      fontSize: "1rem",
    },
    "&:hover": {
      transform: "rotate(90deg)",
    },
  },
  badge: {
    backgroundColor: (props) => props.badageColor,
    "@media (max-width: 780px)": {
      transform: "scale(0.75) translate(-50%,-50%)",
    },
  },
});

//customize fonts
const SmTypography = withStyles({
  root: {
    fontSize: "calc(12px + 0.3vw)",
    fontWeight: "500",
    letterSpacing: "0.005rem",
    lineHeight: 1.25,
  },
})(Typography);

const LgTypography = withStyles({
  root: {
    fontSize: "calc(15px + 0.5vw)",
    fontWeight: "600",
    letterSpacing: "0.02rem",
    lineHeight: 1.25,
  },
})(Typography);

export default function Lists(props) {
  const { crtJob, handleClickOpenEdit } = props;
  //props for makeStyles
  const styleProps = {
    badageColor:
      crtJob.level === "Junior"
        ? "#4caf50"
        : crtJob.level === "Middle"
        ? "#ffc107"
        : crtJob.level === "Senior"
        ? "#9e9e9e"
        : null,
    stateColor:
      crtJob.state === "Submit"
        ? "#00BCD4"
        : crtJob.state === "Interview"
        ? "#8BC34A"
        : crtJob.state === "Test"
        ? "#FFC107"
        : null,
  };
  const classes = useStyles(styleProps);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={5}>
        <div className={classes.listLeft}>
          <Badge
            badgeContent={crtJob.level}
            classes={{
              badge: classes.badge,
            }}
          >
            <LgTypography>{crtJob.title}</LgTypography>
          </Badge>

          <SmTypography>{crtJob.company}</SmTypography>
        </div>
        <div className={classes.listMid}>
          <SmTypography>{crtJob.appliedDate.slice(5, 10)}</SmTypography>
          <LgTypography>{crtJob.source}</LgTypography>
        </div>
        <div className={classes.listState}>
          <div className={classes.stateBox}>
            <LgTypography className={classes.state}>
              {crtJob.state}
            </LgTypography>
          </div>
        </div>
        <div className={classes.listControl}>
          <SettingsIcon
            className={classes.icon}
            onClick={() => handleClickOpenEdit(crtJob)}
          />
        </div>
      </Paper>
    </div>
  );
}
