import React, { useState, useEffect } from 'react';
import useStyles from './Style';
import { Snackbar, IconButton, Slide } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import { getFormattedString } from '../../../../../Helper';
import { useSelector } from 'react-redux';
import { AddNewStudent } from '../../../../../Store/actions';
import { selectAlerts } from '../../../../../Store/selectors';

const AddStudent = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: '',
    sem: '',
    enrollmentId: '',
    email: '',
    phone: '',
    password: '',
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
    await AddNewStudent(state);
    setOpen(true);
    setState({
      name: '',
      sem: '',
      enrollmentId: '',
      email: '',
      phone: '',
      password: '',
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
            root: AlertState.data !== null ? classes.success : classes.danger,
          },
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
      <h1> Add New Student </h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          name='name'
          required
          onChange={handleValueChange}
          value={state.name}
          placeholder='Student Name'
        />
        <input
          type='text'
          name='sem'
          required
          onChange={handleValueChange}
          value={state.sem}
          placeholder='Current Semester'
        />
        <input
          type='text'
          name='enrollmentId'
          required
          onChange={handleValueChange}
          value={state.enrollmentId}
          placeholder='Enrollment Id'
        />
        <input
          type='text'
          name='email'
          required
          onChange={handleValueChange}
          value={state.email}
          placeholder='Email Id'
        />
        <input
          type='text'
          name='phone'
          required
          onChange={handleValueChange}
          value={state.phone}
          placeholder='Phone Number (Whatsapp)'
        />
        <input
          type='password'
          name='password'
          required
          onChange={handleValueChange}
          value={state.password}
          placeholder='Student Password'
        />
        <input type='submit' value='Add Student' />
      </form>
    </div>
  );
};

export default AddStudent;
