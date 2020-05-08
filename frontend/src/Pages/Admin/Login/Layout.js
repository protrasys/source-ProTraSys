import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Slide,
  IconButton,
} from '@material-ui/core';
import useStyles from './Style';
import PTS_Logo from '../../../assets/ProTraSys_Logo.png';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AuthServices } from 'Services';
import { getFormattedString } from 'Helper';
import { Close } from '@material-ui/icons';

const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    AID: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'Admin Login';
  }, []);

  const handleOnChange = (e) => {
    e.persist();
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthServices.AdminLogin(state.AID, state.password);
      history.push('/admincontrolpanel');
    } catch (err) {
      setState((prevState) => {
        return { ...prevState, password: '' };
      });
      setOpen(true);
    }
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Snackbar
        open={open}
        transitionDuration={700}
        autoHideDuration={3500}
        onClose={handleSnackBarClose}
        key={Math.random()}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          classes: {
            root: classes.danger,
          },
        }}
        TransitionComponent={Slide}
        message={getFormattedString('Invalid Credentials, Please try again')}
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
      <Box component='div' className={classes.root}>
        <Box component='div'>
          <Box component='div' className={classes.image}>
            <img src={PTS_Logo} alt='ProTraSys-Logo' className={classes.logo} />
          </Box>
          <Typography className={classes.heading} variant='h5'>
            Administrative Login
          </Typography>
          <Box component='div' className={classes.formSection}>
            <form onSubmit={(e) => handleAdminLogin(e)}>
              <TextField
                fullWidth
                label='Enter your Admin Id'
                variant='filled'
                onChange={handleOnChange}
                required
                value={state.AID}
                color='primary'
                name='AID'
                className={classes.input}
              />
              <TextField
                fullWidth
                label='Enter your Admin password'
                variant='filled'
                onChange={handleOnChange}
                required
                value={state.password}
                type='password'
                name='password'
                color='primary'
                className={classes.input}
              />
              <Box className={classes.center}>
                <Button
                  className={classes.button}
                  color='primary'
                  fullWidth
                  variant='contained'
                  type='submit'
                >
                  Login
                </Button>
                <br />
                <div onClick={() => history.push('/')}>
                  <Typography
                    variant='overline'
                    className={classes.backToHomeButton}
                    color='inherit'
                  >
                    Go Back to Home
                  </Typography>
                </div>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
