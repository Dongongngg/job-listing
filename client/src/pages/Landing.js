import React, { useState, useEffect } from "react";
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
import TouchAppIcon from "@material-ui/icons/TouchApp";
// API
import { signIn } from "../api/users";
//components
import JoblistSVG from "../components/JoblistSVG";
import DialogSignUp from "../components/DialogSignUp";
const MyInput = withStyles({
  root: {
    width: "100%",
    border: "#9c9c9c 0.5px solid",
    borderRadius: "1rem",
    fontSize: "calc(12px + 0.3vw)",
    color: "#717171",
    "& input": {
      borderRadius: "1rem",
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
  headerBox: { position: "absolute", left: "1rem", top: "1rem" },
  headerTitle: { fontSize: "2rem", lineHeight: "1" },

  svgBox: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  arrow: {
    flex: "0",
    fontSize: "5rem",
    paddingTop: "2rem",
    color: "rgb(108, 99, 255)",
    "@media (max-width: 780px)": {
      flex: "none",
    },
  },
  loginBox: {
    display: "flex",
    minHeight: "100vh",
    position: "relative",
  },
  greeting: {
    fontSize: "2rem",
    textAlign: "center",
    lineHeight: "1",
  },
  divider: { margin: "2rem 4rem", padding: "1px" },
  intro: { padding: "3rem 1rem 0 1rem", fontSize: "calc(1rem + 1.5vw)" },
  btnBox: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "1rem",
    "& > button": {
      borderRadius: "1rem",
    },
  },
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
  signinBtn: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    "& > button": {
      borderRadius: "1rem",
    },
  },
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
  footerBox: { position: "absolute", right: "1rem", bottom: "1rem" },
  footer: { fontSize: "1rem", lineHeight: "1", display: "inline" },
});
export default function Landing(props) {
  const classes = useStyle();
  //  input for sign in
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [signInFlag, setSignInFlag] = useState(false);
  const [success, setSuccess] = useState();
  // loading sign for sign in btn
  const [loading, setLoading] = useState(false);
  // sign up
  const [openSignUp, setOpenSignUp] = useState(false);
  const [dialogSuccess, setDialogSuccess] = useState(false);

  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  //  handle sign in btn onClick
  const handleSignIn = async () => {
    if (input.username !== "" && input.password !== "") {
      setLoading(true);
      let res = await signIn(input);
      if (res.success) {
        setTimeout(() => {
          setLoading(false);
          setSignInFlag(true);
          setSuccess(true);
        }, 2000);
        setTimeout(() => {
          props.history.push("/app");
        }, 4000);
      } else {
        setTimeout(() => {
          setLoading(false);
          setSignInFlag(true);
          setSuccess(false);
        }, 2000);
      }
      console.log(res);
    } else {
      setSignInFlag(true);
    }
  };

  // handle sign up dialog
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };
  useEffect(() => {
    handleCloseSignUp();
  }, [dialogSuccess]);
  //  Scroll to id
  const scrollTo = (props) => {
    document.getElementById(props).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <div className={classes.headerBox}>
        <Typography className={classes.headerTitle}>Job List</Typography>
      </div>
      {/* SVG */}
      <Grid item md={7} xs={12} className={classes.svgBox}>
        <JoblistSVG />
        <Typography className={classes.intro}>
          Manage your job applications
        </Typography>
        <TouchAppIcon
          className={classes.arrow}
          onClick={() => scrollTo("login")}
        />
      </Grid>
      {/* Log in */}
      <Grid item md={5} xs={12} className={classes.loginBox}>
        <Grid container justify="center" alignItems="center">
          <Grid item s={8} md={8} lg={6} style={{ margin: "2rem" }}>
            <Typography className={classes.greeting}>Welcome Back!</Typography>
            <Divider variant="middle" className={classes.divider} />
            <Paper elevation={3} className={classes.login} id="login">
              <form>
                <div className={classes.inputBox}>
                  <Typography
                    className={classes.labels}
                    style={{
                      color:
                        (!success || input.username === "") &&
                        signInFlag &&
                        "#e91e63",
                    }}
                  >
                    Username:
                  </Typography>
                  <MyInput
                    name="username"
                    value={input.username}
                    onChange={handleInput}
                    autoComplete="off"
                  ></MyInput>
                </div>
                <div className={classes.inputBox}>
                  <Typography
                    className={classes.labels}
                    style={{
                      color:
                        (!success || input.password === "") &&
                        signInFlag &&
                        "#e91e63",
                    }}
                  >
                    Password:
                  </Typography>
                  <MyInput
                    name="password"
                    value={input.password}
                    onChange={handleInput}
                    type="password"
                    autoComplete="off"
                  ></MyInput>
                </div>
              </form>
              <div className={classes.btnBox}>
                <div className={classes.signinBtn}>
                  <Button
                    variant="contained"
                    disabled={loading}
                    onClick={handleSignIn}
                    className={
                      success
                        ? classes.buttonSuccess
                        : success === false
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

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </Paper>
            <DialogSignUp
              openSignUp={openSignUp}
              handleCloseSignUp={handleCloseSignUp}
              setDialogSuccess={setDialogSuccess}
            />
          </Grid>
        </Grid>
        <div className={classes.footerBox}>
          <Typography className={classes.footer}>Made By </Typography>
          <Typography
            className={classes.footer}
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              window.open("https://www.jingfudong.com");
            }}
          >
            Jingfu
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
