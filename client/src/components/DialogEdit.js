import React, { useState } from "react";
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

export default function DialogEdit({ openEdit, handleClose, crtId }) {
  //0:event.target.name 1:display text
  const inputs = [
    ["jobTitle", "Title"],
    ["jobLevel", "Level"],
    ["companyName", "Company"],
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
  //handle input change
  const handleChange = (event) => {
    setUpdatedJob({ ...updatedJob, [event.target.name]: event.target.value });
  };
  //dialog submit btn
  const handleSubmit = async () => {
    let res = await jobApi.updateJobById(crtId, updatedJob);
    console.log(updatedJob);
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
              id={e[1]}
              name={e[0]}
              placeholder={e[1]}
              inputProps={{ "aria-label": e[1] }}
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
