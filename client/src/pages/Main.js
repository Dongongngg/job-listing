import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Paper,
  Grid,
  Divider,
} from "@material-ui/core/";
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
    backgroundColor: "#BFE1F1",
    minHeight: "100vh",
  },
  paper: {
    margin: "5vh 0",
    "@media (max-width: 780px)": {
      margin: "5vh 0",
    },
    backgroundColor: "#F5F5F5",
    borderRadius: "1rem",
    minHeight: "80vh",
  },
  filterBox: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "2rem",
    "@media (max-width: 780px)": {
      padding: "1rem",
    },
  },
  addIcon: {
    color: "#01579B",
    cursor: "pointer",
    transition: "all 0.5s",
    "&:hover": {
      transform: "rotate(90deg)",
    },
    height: "5vh",
    width: "5vh",
    "@media (max-width: 780px)": {
      height: "4vh",
      width: "4vh",
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
  //  Filter lists
  const [filter, setFilter] = useState("");
  const [filteredJobLists, setFilteredJobLists] = useState([]);
  const [clearFlag, setClearFlag] = useState(false);
  //  Dialog open
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  // Current list
  const [crtJob, setCrtJob] = useState({});
  // Dialog operation success flag
  const [dialogSuccess, setDialogSuccess] = useState(false);
  // Connection failed
  const [networkError, setNetworkError] = useState(false);
  //  Load job data when mounted
  useEffect(() => {
    const getJobLists = async () => {
      let res = await jobApi.getAllJobs();
      if (!res.status) {
        setJobLists(res);
        setFilteredJobLists(res);
      } else {
        setNetworkError(true);
      }
    };
    getJobLists();
  }, []);
  //  Set filter results as filter input changes
  useEffect(() => {
    if (filter === "") {
      setFilteredJobLists(jobLists);
    } else {
      let filterResults = jobLists.filter((e) =>
        e.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredJobLists(filterResults);
    }
  }, [filter, jobLists]);

  const handleClearFilter = () => {
    setFilter("");
  };

  //  handle filter input
  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };
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
    <Grid container direction="row" justify="center" className={classes.root}>
      <Grid item xs={10} md={8} lg={5}>
        <Paper className={classes.paper} elevation={10}>
          <Header count={jobLists.length} />
          <div className={classes.filterBox}>
            <Filter
              input={filter}
              handleInput={handleFilterInput}
              handleClear={handleClearFilter}
            />
            <AddCircleIcon
              className={classes.addIcon}
              onClick={handleClickOpenCreate}
            />
          </div>
          <Divider variant="middle" />

          {jobLists.length === 0 ? (
            <Loading alert="Loading" />
          ) : networkError ? (
            <Loading alert="Connection error" />
          ) : filteredJobLists.length === 0 ? (
            <Loading alert="No results" />
          ) : (
            filteredJobLists.map((jobList, i) => (
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
