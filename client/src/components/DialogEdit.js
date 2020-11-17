import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
//axios api
import * as jobApi from '../api/jobs';
const useStyles = makeStyles({
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.25rem',
    padding: '1rem',
  },
  contentBox: {
    padding: '0rem 2rem',
  },
  inputBox: {
    margin: '1rem',
    '@media (max-width: 780px)': {
      margin: '0.5rem',
    },
  },
  actionBox: {
    paddingTop: '2rem',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  labels: {
    paddingLeft: '0.5rem',
    fontWeight: '500',
    fontSize: 'calc(15px + 0.3vw)',
    '@media (max-width: 780px)': {
      padding: '0.5rem 0 0.25rem 0.25rem',
    },
  },
  datePicker: {
    border: 'none',
    '& .MuiInputBase-root': {
      borderRadius: '1rem',
      fontSize: 'calc(12px + 0.3vw)',
      '& .MuiOutlinedInput-input': { padding: '0.5rem 0.5rem 0.5rem 1rem' },
    },
  },
  deleteBtn: {
    fontSize: 'calc(12px + 0.3vw)',
    color: '#717171',
    cursor: 'pointer',
  },
  submitBtn: {
    fontSize: '0.75rem',
    backgroundColor: '#01579B',
    color: '#fff',
    borderRadius: '1rem',
    '&:hover': {
      backgroundColor: '#01476d',
    },
  },
});
const Alert = ({ alert }) => {
  return (
    <Typography style={{ textAlign: 'center' }}>
      {alert}
      {alert === 'Please login' ? <Link to="/"> back</Link> : null}
    </Typography>
  );
};
Alert.propTypes = {
  alert: PropTypes.string,
};

const MySelect = withStyles({
  root: { width: '100%', color: '#717171' },
  input: {
    borderRadius: '1rem',
    border: '#9c9c9c 0.5px solid',
    fontSize: 'calc(12px + 0.3vw)',
    padding: '6px 1rem 7px',
    color: '#717171',
    '&:focus': {
      padding: '6px 1rem 7px',
      borderRadius: '1rem',
      backgroundColor: 'white',
    },
  },
})(InputBase);

const MyInput = withStyles({
  root: {
    width: '100%',
    border: '#9c9c9c 0.5px solid',
    borderRadius: '1rem',
    fontSize: 'calc(12px + 0.3vw)',
    color: '#717171',
    '& input': {
      paddingLeft: '1rem',
    },
  },
})(InputBase);

export default function DialogEdit({ openEdit, handleCloseEdit, crtJob, setDialogSuccess }) {
  const classes = useStyles();
  //0:event.target.name 1:display text
  const inputs = [
    ['companyName', 'Company Name'],
    ['source', 'Source'],
  ];

  const [updatedJob, setUpdatedJob] = useState({
    jobTitle: '',
    jobLevel: '',
    companyName: '',
    source: '',
    appliedDate: new Date(),
    state: '',
  });
  const [updatedJobFlag, setUpdatedJobFlag] = useState(false);
  // Connection failed
  const [loginError, setLoginError] = useState(false);

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
    setUpdatedJobFlag(true);
    if (updatedJob.jobTitle !== '') {
      let res = await jobApi.updateJobById(crtJob._id, updatedJob);

      if (res.success) {
        handleCloseEdit();
        setDialogSuccess(true);
        setUpdatedJobFlag(false);
        console.log(res);
      } else if (res === 'Invalid Token' || res === 'Access Denied') {
        setLoginError(true);
      } else {
        console.log(res);
      }
    }
  };

  // Dialog delete btn
  const handleDelete = async () => {
    let res = await jobApi.deleteJobById(crtJob._id);
    if (res.success) {
      handleCloseEdit();
      setDialogSuccess(true);
      setUpdatedJobFlag(false);
      console.log(res);
    } else if (res === 'Invalid Token' || res === 'Access Denied') {
      setLoginError(true);
    } else {
      console.log(res);
    }
  };

  const handleDate = (date, event) => {
    setUpdatedJob({ ...updatedJob, appliedDate: date });
  };

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit} className={classes.root}>
      <div className={classes.titleBox}>
        <Typography className={classes.title}>Update Job</Typography>
      </div>
      <DialogContent className={classes.contentBox}>
        <div className={classes.inputBox}>
          <Typography className={classes.labels}>Level:</Typography>
          <Select
            name="jobLevel"
            className={classes.input}
            input={<MySelect />}
            value={updatedJob.jobLevel || ''}
            onChange={handleChange}
          >
            <MenuItem value={'Junior'}>Junior</MenuItem>
            <MenuItem value={'Middle'}>Middle</MenuItem>
            <MenuItem value={'Senior'}>Senior</MenuItem>
          </Select>
        </div>
        <div className={classes.inputBox}>
          <Typography
            className={classes.labels}
            style={{
              color: updatedJob.jobTitle === '' && updatedJobFlag && '#e91e63',
            }}
          >
            *Title:
          </Typography>
          <MyInput
            name="jobTitle"
            placeholder="jobTitle"
            value={updatedJob.jobTitle || ''}
            onChange={handleChange}
          ></MyInput>
        </div>
        {inputs.map((e, i) => (
          <div className={classes.inputBox} key={i}>
            <Typography className={classes.labels}>{e[1]}:</Typography>
            <MyInput
              name={e[0]}
              placeholder={e[1]}
              value={updatedJob[e[0]] || ''}
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
            value={updatedJob.state || ''}
            onChange={handleChange}
          >
            <MenuItem value={'Submit'}>Submit</MenuItem>
            <MenuItem value={'Interview'}>Interview</MenuItem>
            <MenuItem value={'Test'}>Test</MenuItem>
          </Select>
        </div>
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
      {loginError ? <Alert alert="Please login" /> : null}
      <DialogActions className={classes.actionBox}>
        <Typography className={classes.deleteBtn} onClick={handleDelete}>
          Delete
        </Typography>
        <Button
          variant="contained"
          size="small"
          className={classes.submitBtn}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
DialogEdit.propTypes = {
  openEdit: PropTypes.bool,
  handleCloseEdit: PropTypes.func,
  crtJob: PropTypes.object,
  setDialogSuccess: PropTypes.func,
};
