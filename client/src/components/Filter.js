import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  root: { padding: '0 2rem' },
  cancel: {
    color: '#808080',
    paddingRight: '0.5rem',
    cursor: 'pointer',
  },
});

const MyInput = withStyles({
  root: {
    width: '100%',
    borderRadius: '2rem',
    boxShadow: '0px 4px 10px -3px rgba(0,0,0,0.3)',
    backgroundColor: 'white',
    height: '5vh',
    '@media (max-width: 780px)': {
      height: '4vh',
    },
    '& input': {
      paddingLeft: '1rem',
      '@media (max-width: 780px)': {
        paddingLeft: '0.5rem',
      },
    },
  },
})(InputBase);

export default function Filter({ input, handleInput, handleClear }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyInput
        id="filter"
        placeholder="Filter"
        endAdornment={<CancelIcon className={classes.cancel} onClick={handleClear} />}
        value={input}
        onChange={handleInput}
      />
    </div>
  );
}

Filter.propTypes = {
  input: PropTypes.object,
  handleInput: PropTypes.func,
  handleClear: PropTypes.func,
};
