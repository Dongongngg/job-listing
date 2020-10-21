import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//components
import Header from "../components/Header";
import Filter from "../components/Filter";
import Lists from "../components/Lists";

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

  const text = [
    {
      jobTitle: "Full-stack Developer",
      companyName: "My Company adadasdad",
      submitDate: "21/10/2020",
      source: "Seek",
      jobState: "Submit",
    },
    {
      jobTitle: "Full-stack Developer",
      companyName: "Metigy",
      submitDate: "14/10/2020",
      source: "LinkedIn",
      jobState: "Interview",
    },
    {
      jobTitle: "Full-stack Developer",
      companyName: "Purple Patch Consulting ",
      submitDate: "12/10/2020",
      source: "LinkedIn",
      jobState: "Test",
    },
    {
      jobTitle: "WordPress Developer",
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
          {text.map((jobList, i) => (
            <Lists
              key={i}
              jobTitle={jobList.jobTitle}
              companyName={jobList.companyName}
              submitDate={jobList.submitDate}
              source={jobList.source}
              jobState={jobList.jobState}
            />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}
