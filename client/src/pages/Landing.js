import React, { useState } from "react";
import {
  InputBase,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Grid,
  Divider,
} from "@material-ui/core/";

import { makeStyles, withStyles } from "@material-ui/core/styles";
// API
import { signIn } from "../api/users";
//
import JoblistSVG from "../components/JoblistSVG";
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
const useStyle = makeStyles({
  root: {
    height: "100vh",
    backgroundColor: "#eee",
  },
  svgBox: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  loginBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  greeting: {
    fontSize: "2rem",
    textAlign: "center",
    padding: "1rem 0",
    lineHeight: "normal",
  },
  intro: { padding: "3rem 1rem 0 1rem", fontSize: "3rem" },
  login: {
    borderRadius: "1rem",
    padding: "1rem",
    margin: "1rem",
  },

  inputBox: {
    padding: "0 1rem 1rem 1rem",
    "@media (max-width: 780px)": {
      padding: "0 1rem 1rem 1rem",
    },
  },
  labels: { padding: "1rem 1rem 1rem 0" },

  button: {
    marginRight: "1rem",
    backgroundColor: "rgb(108, 99, 255)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(88, 79, 255)",
      border: "1px solid #fffff",
    },
  },
  buttonSuccess: {
    marginRight: "1rem",
    backgroundColor: "#8bc34a",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#8bc34a",
    },
  },
  buttonFailed: {
    marginRight: "1rem",
    backgroundColor: "#ff9800",
    color: "#fff",
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
export default function Landing(props) {
  const classes = useStyle();
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
      className={classes.root}
    >
      {/* SVG */}
      <Grid item md={7} xs={12} className={classes.svgBox}>
        <JoblistSVG />
        <Typography className={classes.intro}>
          Manage your job applications
        </Typography>
      </Grid>
      {/* Log in */}
      <Grid item md={5} xs={12} className={classes.loginBox}>
        <Grid container justify="center" alignItems="center">
          <Grid item s={8} md={5} lg={5} style={{ margin: "2rem" }}>
            <Typography className={classes.greeting}>Welcome Back!</Typography>
            <Divider variant="middle" style={{ margin: "0 4rem" }} />
            <Paper elevation={3} className={classes.login}>
              <div className={classes.inputBox}>
                <Typography className={classes.labels}>Username:</Typography>
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
                <Typography className={classes.errorSign}>
                  {signInError}
                </Typography>
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
      </Grid>
    </Grid>
  );
}
