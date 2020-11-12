import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Button,
  Typography,
} from "@material-ui/core";

//axios api
import { signUp } from "../api/users";
const useStyles = makeStyles({
  title: {
    fontSize: "1.25rem",
    padding: "1rem",
  },

  inputBox: {
    margin: "1rem",
    "@media (max-width: 780px)": {
      margin: "0.5rem",
    },
  },

  labels: {
    paddingLeft: "0.5rem",
    fontWeight: "500",
    fontSize: "calc(15px + 0.3vw)",
    "@media (max-width: 780px)": {
      padding: "0.5rem 0 0.25rem 0.25rem",
    },
  },
  actionBox: {
    padding: "1rem",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  cancelBtn: {
    color: "#717171",
    backgroundColor: "#e0e0e0",
    fontSize: "0.75rem",
    borderRadius: "1rem",
    "&:hover": {
      backgroundColor: "#d0d0d0",
    },
  },
  submitBtn: {
    fontSize: "0.75rem",
    backgroundColor: "rgb(108, 99, 255)",
    color: "#fff",
    borderRadius: "1rem",
    "&:hover": {
      backgroundColor: "rgb(88, 79, 255)",
    },
  },
  signUpState: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: "calc(10px + 0.3vw)",
    "@media (max-width: 780px)": {
      padding: "0.5rem 0 0.25rem 0.25rem",
    },
  },
});

const MyInput = withStyles({
  root: {
    width: "100%",
    border: "#9c9c9c 0.5px solid",
    borderRadius: "1rem",
    fontSize: "calc(12px + 0.3vw)",
    color: "#717171",
    "& input": {
      paddingLeft: "1rem",
    },
  },
})(InputBase);

export default function DialogSignUp({
  openSignUp,
  handleCloseSignUp,
  setDialogSuccess,
}) {
  const classes = useStyles();

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [signUpFlag, setSignUpFlag] = useState(false);
  const [signUpState, setSignUpState] = useState(false);

  //  handle input change
  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };
  //  dialog submit btn
  const handleSubmit = async () => {
    setSignUpFlag(true);
    if (
      newUser.username !== "" &&
      newUser.password !== "" &&
      newUser.rePassword !== ""
    ) {
      if (newUser.rePassword === newUser.password) {
        let res = await signUp(newUser);
        if (res.success) {
          setSignUpState("Create success");
          setNewUser({
            username: "",
            password: "",
            rePassword: "",
          });
          setSignUpFlag(false);
          setTimeout(() => {
            setDialogSuccess(true);
          }, 2000);
          console.log(res);
        } else {
          setSignUpState(res.error);
        }
      } else {
        setSignUpState("Confirming password failed");
      }
    }
  };

  return (
    <Dialog
      maxWidth={false}
      open={openSignUp}
      onClose={handleCloseSignUp}
      className={classes.root}
    >
      <DialogContent>
        <form>
          <div className={classes.inputBox}>
            <Typography
              className={classes.labels}
              style={{
                color: newUser.username === "" && signUpFlag && "#e91e63",
              }}
            >
              Username (6 or more characters):
            </Typography>
            <MyInput
              autoComplete="off"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChange}
            ></MyInput>
          </div>
          <div className={classes.inputBox}>
            <Typography
              className={classes.labels}
              style={{
                color: newUser.password === "" && signUpFlag && "#e91e63",
              }}
            >
              Password (6 or more characters):
            </Typography>
            <MyInput
              autoComplete="off"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
              type="password"
            ></MyInput>
          </div>
          <div className={classes.inputBox}>
            <Typography
              className={classes.labels}
              style={{
                color:
                  (signUpState === "Confirming password failed" ||
                    newUser.rePassword === "") &&
                  signUpFlag &&
                  "#e91e63",
              }}
            >
              Confirm password:
            </Typography>
            <MyInput
              autoComplete="off"
              name="rePassword"
              placeholder="Confirm password"
              value={newUser.rePassword}
              onChange={handleChange}
              type="password"
            ></MyInput>
          </div>
        </form>
      </DialogContent>
      <Typography className={classes.signUpState}>{signUpState}</Typography>
      <DialogActions className={classes.actionBox}>
        <Button
          variant="contained"
          className={classes.cancelBtn}
          onClick={handleCloseSignUp}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={classes.submitBtn}
          onClick={handleSubmit}
          color="primary"
        >
          Sign up
        </Button>
      </DialogActions>
    </Dialog>
  );
}
