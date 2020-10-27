import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Button,
  Typography,
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
    backgroundColor: "#01579B",
    color: "#fff",
    borderRadius: "1rem",
    "&:hover": {
      backgroundColor: "#01579B",
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

export default function DialogEdit({
  openEdit,
  handleClose,
  crtJob,
  setUpdateSuccess,
}) {
  const classes = useStyles();
  //0:event.target.name 1:display text
  const inputs = [
    ["jobTitle", "Job Title"],
    ["jobLevel", "Job Level"],
    ["companyName", "Company Name"],
    ["source", "Source"],
    ["state", "State"],
  ];

  const [updatedJob, setUpdatedJob] = useState({
    jobTitle: "",
    jobLevel: "",
    companyName: "",
    source: "",
    appliedDate: new Date(),
    state: "",
  });

  //copy crtJob value as default value for each input
  useEffect(() => {
    setUpdatedJob({
      jobTitle: crtJob.title,
      jobLevel: crtJob.level,
      companyName: crtJob.company,
      source: crtJob.source,
      appliedDate: crtJob.appliedDate,
      state: crtJob.state,
    });
  }, [crtJob]);
  //  handle input change
  const handleChange = (event) => {
    setUpdatedJob({ ...updatedJob, [event.target.name]: event.target.value });
  };
  //  dialog submit btn
  const handleSubmit = async () => {
    console.log(updatedJob);
    let res = await jobApi.updateJobById(crtJob._id, updatedJob);
    console.log(res);
    if (res.success) {
      handleClose();
      setUpdateSuccess(true);
    }
  };
  // Dialog delete btn
  const handleDelete = async () => {
    let res = await jobApi;
  };

  const handleDate = (date, event) => {
    setUpdatedJob({ ...updatedJob, appliedDate: date });
  };

  return (
    <Dialog open={openEdit} onClose={handleClose} className={classes.root}>
      <div className={classes.titleBox}>
        <Typography className={classes.title}>Update Job</Typography>
      </div>
      <DialogContent className={classes.contentBox}>
        {inputs.map((e, i) => (
          <div className={classes.inputBox} key={i}>
            <Typography className={classes.labels}>{e[1]}:</Typography>
            <MyInput
              name={e[0]}
              placeholder={e[1]}
              value={updatedJob[e[0]] || ""}
              onChange={handleChange}
            ></MyInput>
          </div>
        ))}
        <div className={classes.inputBox}>
          <Typography className={classes.labels}>Applied Date:</Typography>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              disableToolbar
              inputVariant="outlined"
              className={classes.datePicker}
              value={updatedJob.appliedDate}
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
