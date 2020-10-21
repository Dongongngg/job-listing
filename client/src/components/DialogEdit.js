import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  Button,
} from "@material-ui/core";
//axios api
import * as jobApi from "../api/jobs";

export default function DialogEdit({
  openEdit,
  handleClose,
  crtJob,
  setCrtJob,
  setUpdateSuccess,
}) {
  //0:event.target.name 1:display text 2:defult value
  const inputs = [
    ["jobTitle", "Job Title"],
    ["jobLevel", "Job Level"],
    ["companyName", "Company Name"],
    ["source", "Source"],
    ["appliedDate", "Applied date"],
    ["state", "State"],
  ];

  const [updatedJob, setUpdatedJob] = useState({
    jobTitle: "",
    jobLevel: "",
    companyName: "",
    source: "",
    appliedDate: "",
    state: "",
  });
  //copy crtJob value as default value for each input
  useEffect(() => {
    setUpdatedJob({
      jobTitle: crtJob.title,
      jobLevel: crtJob.level,
      companyName: crtJob.company,
      source: crtJob.source,
      appliedDate: "",
      state: crtJob.state,
    });
  }, [crtJob]);
  //handle input change
  const handleChange = (event) => {
    setUpdatedJob({ ...updatedJob, [event.target.name]: event.target.value });
  };
  //dialog submit btn
  const handleSubmit = async () => {
    let res = await jobApi.updateJobById(crtJob._id, updatedJob);
    console.log(res);
    if (res.success) {
      handleClose();
      setUpdateSuccess(true);
    }
  };

  return (
    <Dialog
      open={openEdit}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update Job</DialogTitle>
      <DialogContent>
        <DialogContentText>Update your job information</DialogContentText>
        <DialogContent>
          {inputs.map((e, i) => (
            <InputBase
              key={i}
              name={e[0]}
              placeholder={e[1]}
              value={updatedJob[e[0]] || ""}
              onChange={handleChange}
            ></InputBase>
          ))}
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
