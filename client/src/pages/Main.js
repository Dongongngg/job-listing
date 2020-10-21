import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//components
import Header from "../components/Header";
import Filter from "../components/Filter";
import Lists from "../components/Lists";
import DialogEdit from "../components/DialogEdit";
//axios api
import * as jobApi from "../api/jobs";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#2979FF",
    minHeight: "100vh",
  },
  paper: {
    margin: "10% 0",
    backgroundColor: "#F5F5F5",
    borderRadius: "20px",
    minHeight: "80vh",
  },
});

export default function Main() {
  const classes = useStyles();
  const [jobLists, setJobLists] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [crtJob, setCrtJob] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  //load job data when mounted
  useEffect(() => {
    const getJobLists = async () => {
      let res = await jobApi.getAllJobs();
      setJobLists(res);
    };
    getJobLists();
  }, []);

  //dialog operations
  const handleClickOpen = (job) => {
    setOpenEdit(true);
    setCrtJob(job);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setCrtJob({});
  };
  //when update finished, close dialog and re-fetch get all jobs api
  useEffect(() => {
    const getJobLists = async () => {
      let res = await jobApi.getAllJobs();
      setJobLists(res);
    };
    if (updateSuccess) {
      getJobLists();
    }
    return () => {
      setUpdateSuccess(false);
    };
  }, [updateSuccess]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={10} md={8} lg={5}>
        <Paper className={classes.paper} elevation={10}>
          <Header count={jobLists.length} />
          <Filter />
          {jobLists.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            jobLists.map((jobList, i) => (
              <Lists
                key={i}
                crtJob={jobList}
                jobTitle={jobList.title}
                jobLevel={jobList.level}
                companyName={jobList.company}
                appliedDate={jobList.appliedDate}
                source={jobList.source}
                jobState={jobList.state}
                handleClickOpen={handleClickOpen}
              />
            ))
          )}
        </Paper>
      </Grid>
      <DialogEdit
        openEdit={openEdit}
        handleClose={handleClose}
        crtJob={crtJob}
        setCrtJob={setCrtJob}
        setUpdateSuccess={setUpdateSuccess}
      />
    </Grid>
  );
}
