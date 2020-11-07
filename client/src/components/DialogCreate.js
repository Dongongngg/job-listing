import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
//axios api
import * as jobApi from "../api/jobs";
const useStyles = makeStyles({
  titleBox: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: "1.25rem",
    padding: "1rem",
  },
  contentBox: {
    padding: "0rem 2rem",
  },
  inputBox: {
    margin: "1rem",
    "@media (max-width: 780px)": {
      margin: "0.5rem",
    },
  },
  actionBox: {
    paddingTop: "2rem",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  labels: {
    paddingLeft: "0.5rem",
    fontWeight: "500",
    fontSize: "calc(15px + 0.3vw)",
    "@media (max-width: 780px)": {
      padding: "0.5rem 0 0.25rem 0.25rem",
    },
  },
  datePicker: {
    border: "none",
    "& .MuiInputBase-root": {
      borderRadius: "1rem",
      fontSize: "calc(12px + 0.3vw)",
      "& .MuiOutlinedInput-input": { padding: "0.5rem 0.5rem 0.5rem 1rem" },
    },
  },
  delete: {
    fontSize: "calc(12px + 0.3vw)",
    color: "#717171",
  },
  submit: {
    fontSize: "0.75rem",
    backgroundColor: "#01579B",
    color: "#fff",
    borderRadius: "1rem",
    "&:hover": {
      backgroundColor: "#01579B",
    },
  },
});

const MySelect = withStyles({
  root: { width: "100%", color: "#717171" },
  input: {
    borderRadius: "1rem",
    border: "#9c9c9c 0.5px solid",
    fontSize: "calc(12px + 0.3vw)",
    padding: "6px 1rem 7px",
    color: "#717171",
    "&:focus": {
      padding: "6px 1rem 7px",
      borderRadius: "1rem",
      backgroundColor: "white",
    },
  },
})(InputBase);

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

export default function DialogEdit({
  openCreate,
  handleCloseCreate,
  setDialogSuccess,
}) {
  const classes = useStyles();
  //0:event.target.name 1:display text
  const inputs = [
    ["companyName", "Company"],
    ["source", "Applied from"],
  ];

  const [newJob, setNewJob] = useState({
    jobTitle: "",
    jobLevel: "",
    companyName: "",
    source: "",
    appliedDate: new Date(),
    state: "",
  });
  const [createFlag, setCreateFlag] = useState(false);

  //  handle input change
  const handleChange = (event) => {
    setNewJob({ ...newJob, [event.target.name]: event.target.value });
  };
  //  dialog submit btn
  const handleSubmit = async () => {
    setCreateFlag(true);
    if (newJob.jobTitle !== "") {
      let res = await jobApi.addJob(newJob);
      console.log(res);
      if (res.success) {
        handleCloseCreate();
        setDialogSuccess(true);
        setNewJob({
          jobTitle: "",
          jobLevel: "",
          companyName: "",
          source: "",
          appliedDate: new Date(),
          state: "",
        });
        setCreateFlag(false);
      }
    }
  };
  // Dialog delete btn
  const handleDelete = async () => {
    let res = await jobApi;
  };

  const handleDate = (date, event) => {
    setNewJob({ ...newJob, appliedDate: date });
  };

  return (
    <Dialog
      open={openCreate}
      onClose={handleCloseCreate}
      className={classes.root}
    >
      <div className={classes.titleBox}>
        <Typography className={classes.title}>Create Job</Typography>
      </div>
      <DialogContent className={classes.contentBox}>
        <div className={classes.inputBox}>
          <Typography className={classes.labels}>Level:</Typography>
          <Select
            name="jobLevel"
            className={classes.input}
            input={<MySelect />}
            value={newJob.jobLevel || ""}
            onChange={handleChange}
          >
            <MenuItem value={"Junior"}>Junior</MenuItem>
            <MenuItem value={"Middle"}>Middle</MenuItem>
            <MenuItem value={"Senior"}>Senior</MenuItem>
          </Select>
        </div>
        <div className={classes.inputBox}>
          <Typography
            className={classes.labels}
            style={{ color: newJob.jobTitle === "" && createFlag && "red" }}
          >
            *Title:
          </Typography>
          <MyInput
            autoFocus={true}
            name="jobTitle"
            placeholder="jobTitle"
            value={newJob.jobTitle || ""}
            onChange={handleChange}
          ></MyInput>
        </div>
        {inputs.map((e, i) => (
          <div className={classes.inputBox} key={i}>
            <Typography className={classes.labels}>{e[1]}:</Typography>
            <MyInput
              name={e[0]}
              placeholder={e[1]}
              value={newJob[e[0]] || ""}
              onChange={handleChange}
            ></MyInput>
          </div>
        ))}

        <div className={classes.inputBox}>
          <Typography className={classes.labels}>State:</Typography>
          <Select
            name="state"
            className={classes.input}
            input={<MySelect />}
            value={newJob.state || ""}
            onChange={handleChange}
          >
            <MenuItem value={"Submit"}>Submit</MenuItem>
            <MenuItem value={"Interview"}>Interview</MenuItem>
            <MenuItem value={"Test"}>Test</MenuItem>
          </Select>
        </div>
        <div className={classes.inputBox}>
          <Typography className={classes.labels}>Applied date:</Typography>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              disableToolbar
              inputVariant="outlined"
              className={classes.datePicker}
              value={newJob.appliedDate}
              onChange={handleDate}
            />
          </MuiPickersUtilsProvider>
        </div>
      </DialogContent>
      <DialogActions className={classes.actionBox}>
        <Typography className={classes.delete}>Delete</Typography>
        <Button
          variant="contained"
          size="small"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
