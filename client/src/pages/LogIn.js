import React, { useState } from "react";

import {
  InputBase,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
//
import { signIn } from "../api/users";

const MyInput = withStyles({
  root: {
    width: "100%",
    border: "#9c9c9c 0.5px solid",
    borderRadius: "1rem",
    fontSize: "calc(12px + 0.3vw)",
    color: "#717171",
    "& input": {
      paddingLeft: "1rem",
      "&:focus": {
        borderRadius: "1rem",
      },
    },
  },
})(InputBase);

const useStyles = makeStyles({
  loginBox: { height: "100vh" },
  inputBox: { padding: "1rem 2rem" },
  labels: { padding: "1rem 1rem 1rem 0" },
  btnBox: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  button: { marginRight: "1rem" },
  buttonSuccess: {
    marginRight: "1rem",
    backgroundColor: "#8bc34a",
    "&:hover": {
      backgroundColor: "#8bc34a",
    },
  },
  buttonFailed: {
    marginRight: "1rem",
    backgroundColor: "#ff9800",
    "&:hover": {
      backgroundColor: "#ff9800",
    },
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  errorSign: { padding: "1rem" },
});

export default function LogIn() {
  const classes = useStyles();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [signInError, setSignInError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const handleSignIn = async () => {
    setLoading(true);
    let res = await signIn(input);
    if (res.success) {
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
      setTimeout(() => {
        props.history.push("/app");
      }, 4000);
    } else {
      setTimeout(() => {
        setSignInError("Wrong password.");
        setLoading(false);
      }, 2000);
    }
    console.log(res);
  };
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.loginBox}
    >
      <Grid item xs={8} md={8} lg={8}>
        <Paper elevation={5} style={{ borderRadius: "1rem" }}>
          <div className={classes.inputBox}>
            <Typography className={classes.labels}>User name:</Typography>
            <MyInput
              name="username"
              value={input.username}
              onChange={handleInput}
            ></MyInput>
          </div>
          <div className={classes.inputBox}>
            <Typography className={classes.labels}>Password:</Typography>
            <MyInput
              name="password"
              value={input.password}
              onChange={handleInput}
              type="password"
            ></MyInput>
          </div>
          <div className={classes.btnBox}>
            <Typography className={classes.errorSign}>{signInError}</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={handleSignIn}
                  className={
                    success
                      ? classes.buttonSuccess
                      : signInError
                      ? classes.buttonFailed
                      : classes.button
                  }
                >
                  {!success ? "Sign In" : "Success"}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>

              <Button variant="outlined" color="primary">
                Sign Up
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
