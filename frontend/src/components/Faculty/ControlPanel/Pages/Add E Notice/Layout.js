import React, { useState, useEffect } from 'react';
import useStyles from './Style';
import { Snackbar, IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { getFormattedString } from '../../../../../Helper';
import { useSelector } from 'react-redux';
import { AddNewENotice } from '../../../../../store/actions';
import { selectAlerts } from '../../../../../store/selectors';

const AddENotice = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    title: '',
    description: ''
  });

  const AlertState = useSelector(selectAlerts);

  const handleValueChange = (e) => {
    e.persist();
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await AddNewENotice(state);
    setOpen(true);
    setState({
      title: '',
      description: ''
    });
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        transitionDuration={500}
        key={Math.random()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          classes: {
            root: AlertState.data !== null ? classes.success : classes.danger
          }
        }}
        TransitionComponent={Slide}
        message={!AlertState.loading && getFormattedString(AlertState.data)}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleSnackBarClose}
            >
              <Close fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <h1>Upload E Notice</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          name='title'
          required
          onChange={handleValueChange}
          value={state.title}
          placeholder='Notice Title'
        />
        <input
          type='text'
          name='description'
          required
          onChange={handleValueChange}
          value={state.description}
          placeholder='Notice Description'
        />
        <input type='submit' value='Upload E Notice' />
      </form>
    </div>
  );
};

export default AddENotice;
