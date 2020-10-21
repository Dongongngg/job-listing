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
  const [crtId, setCrtId] = useState("");
  //load job data when mounted
  useEffect(() => {
    const getJobLists = async () => {
      let res = await jobApi.getAllJobs();
      setJobLists(res);
    };
    getJobLists();
  }, []);

  //dialog
  const handleClickOpen = (id) => {
    setOpenEdit(true);
    setCrtId(id);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setCrtId("");
  };

  const text = [
    {
      jobTitle: "Full-stack Developer",
      jobLevel: "Junior",
      companyName: "My Company adadasdad",
      submitDate: "21/10/2020",
      source: "Seek",
      jobState: "Submit",
    },
    {
      jobTitle: "Full-stack Developer",
      jobLevel: "Middle",
      companyName: "Metigy",
      submitDate: "14/10/2020",
      source: "LinkedIn",
      jobState: "Interview",
    },
    {
      jobTitle: "Full-stack Developer",
      jobLevel: "Senior",
      companyName: "Purple Patch Consulting ",
      submitDate: "12/10/2020",
      source: "LinkedIn",
      jobState: "Test",
    },
    {
      jobTitle: "WordPress Developer",
      jobLevel: "Senior",
      companyName: "My Company adadasdad",
      submitDate: "21/10/2020",
      source: "Seek",
      jobState: "Interview",
    },
    {
      jobTitle: "WordPress Developer",
      jobLevel: "Junior",
      companyName: "My Company adadasdad",
      submitDate: "21/10/2020",
      source: "Seek",
      jobState: "Interview",
    },
  ];
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
          <Header count={text.length} />
          <Filter />
          {jobLists.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            jobLists.map((jobList, i) => (
              <Lists
                key={i}
                id={jobList._id}
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
        handleClickOpen={handleClickOpen}
        crtId={crtId}
      />
    </Grid>
  );
}
