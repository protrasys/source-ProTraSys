import React, { useState, useEffect } from 'react';
import useStyles from './Style';
import {
  Snackbar,
  IconButton,
  Slide,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
} from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import { getFormattedString } from '../../../../../Helper';
import { useSelector } from 'react-redux';
import { AddNewStudent } from '../../../../../Store/actions';
import { selectAlerts } from '../../../../../Store/selectors';
import ProTraSys from '../../../../../assets/ProTraSys_Logo.png';

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
      <Box variant='div' className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Box style={{ textAlign: 'center' }}>
              <img src={ProTraSys} alt='Logo' className={classes.img} />
              <Typography className={classes.text} color='inherit'>
                Add New Student
              </Typography>
            </Box>
            <form onSubmit={handleFormSubmit} className={classes.form}>
              <TextField
                type='text'
                name='name'
                onChange={handleValueChange}
                value={state.name}
                placeholder='Student Name'
                required
                fullWidth={true}
                label='Name'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
              <TextField
                type='text'
                name='sem'
                onChange={handleValueChange}
                value={state.sem}
                placeholder='Current Semester'
                required
                fullWidth={true}
                label='Semester'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
              <TextField
                type='text'
                name='enrollmentId'
                onChange={handleValueChange}
                value={state.enrollmentId}
                placeholder='Enrollment Id'
                required
                fullWidth={true}
                label='Enrollment Id'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
              <TextField
                type='text'
                name='email'
                onChange={handleValueChange}
                value={state.email}
                placeholder='Student Email'
                required
                fullWidth={true}
                label='Email'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
              <TextField
                type='text'
                name='phone'
                onChange={handleValueChange}
                value={state.phone}
                placeholder='Phone Number (Whatsapp)'
                required
                fullWidth={true}
                label='Phone Number (Whatsapp)'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
              <TextField
                type='text'
                name='password'
                onChange={handleValueChange}
                value={state.password}
                placeholder='Student Password'
                required
                fullWidth={true}
                label='Password'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
            </form>
          </CardContent>
          <CardActions>
            <Button
              type='submit'
              className={classes.btn}
              variant='contained'
              size='large'
            >
              Add New Student
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default AddStudent;
