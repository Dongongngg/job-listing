import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Paper, Grid } from "@material-ui/core/";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//components
import Header from "../components/Header";
import Filter from "../components/Filter";
import Lists from "../components/Lists";
import DialogEdit from "../components/DialogEdit";
import DialogCreate from "../components/DialogCreate";

//axios api
import * as jobApi from "../api/jobs";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#a5e1ff",
    minHeight: "100vh",
  },
  paper: {
    margin: "10% 0",
    backgroundColor: "#F5F5F5",
    borderRadius: "1rem",
    minHeight: "80vh",
  },
  filterBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addIcon: {
    color: "#01579B",
    fontSize: "calc(2rem + 2vw) ",
    cursor: "pointer",
    transition: "all 0.5s",
    "&:hover": {
      transform: "rotate(90deg)",
    },
  },
});

const Loading = ({ alert }) => {
  return (
    <Typography style={{ textAlign: "center", padding: "1rem" }}>
      {alert}
    </Typography>
  );
};

export default function Main() {
  const classes = useStyles();
  const [jobLists, setJobLists] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [crtJob, setCrtJob] = useState({});
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  //  Load job data when mounted
  useEffect(() => {
    const getJobLists = async () => {
      let res = await jobApi.getAllJobs();
      if (!res.status) {
        setJobLists(res);
      } else {
        setNetworkError(true);
      }
    };
    getJobLists();
  }, []);

  //  Edit dialog open/close
  const handleClickOpenEdit = (job) => {
    setOpenEdit(true);
    setCrtJob(job);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setCrtJob({});
  };
  //  Edit dialog open/close
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  //  When update/close finished, close dialog and re-fetch get all jobs api
  useEffect(() => {
    const getJobLists = async () => {
      let res = await jobApi.getAllJobs();
      setJobLists(res);
    };
    if (dialogSuccess) {
      getJobLists();
    }
    return () => {
      setDialogSuccess(false);
    };
  }, [dialogSuccess]);

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
          <div className={classes.filterBox}>
            <Filter />
            <AddCircleIcon
              className={classes.addIcon}
              onClick={handleClickOpenCreate}
            />
          </div>

          {jobLists.length === 0 ? (
            <Loading alert="Loading..." />
          ) : networkError ? (
            <Loading alert="Connection error" />
          ) : (
            jobLists.map((jobList, i) => (
              <Lists
                key={i}
                crtJob={jobList}
                handleClickOpenEdit={handleClickOpenEdit}
              />
            ))
          )}
        </Paper>
      </Grid>
      {/* edit dialog */}
      <DialogEdit
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        crtJob={crtJob}
        setDialogSuccess={setDialogSuccess}
      />
      {/* create dialog */}
      <DialogCreate
        openCreate={openCreate}
        handleCloseCreate={handleCloseCreate}
        setDialogSuccess={setDialogSuccess}
      />
    </Grid>
  );
}
