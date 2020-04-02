import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Slide,
  IconButton
} from '@material-ui/core';
import useStyles from './Style';
import PTS_Logo from '../../../assets/ProTraSys_Logo.png';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectAlerts } from '../../../store/selectors';
import { setAlert } from '../../../store/reducers';
import { store } from '../../../store';
import { AuthServices } from '../../../Services';
import { getFormattedString } from '../../../Helper';
import { Close } from '@material-ui/icons';

const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    AID: '',
    password: ''
  });

  const AlertState = useSelector(selectAlerts);

  useEffect(() => {
    document.title = 'Admin Login';
  }, []);

  const handleOnChange = (e) => {
    e.persist();
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleAdminLogin = async () => {
    try {
      await AuthServices.AdminLogin(state.AID, state.password);
      setOpen(true);
      history.push('/admincontrolpanel');
    } catch (err) {
      store.dispatch(setAlert.failed(err || {}));
      console.log('Internal Server Error');
      setOpen(true);
    } finally {
      setState({
        AID: '',
        password: ''
      });
      setOpen(false);
    }
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  return (
    <Box>
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
      <Box component='div' className={classes.root}>
        <Box component='div'>
          <Box component='div' className={classes.image}>
            <img src={PTS_Logo} alt='ProTraSys-Logo' className={classes.logo} />
          </Box>
          <Typography className={classes.heading} variant='h5'>
            Administrative Login
          </Typography>
          <Box component='div' className={classes.formSection}>
            <form>
              <TextField
                fullWidth
                label='Enter your Admin Id'
                variant='filled'
                onChange={handleOnChange}
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
                  onClick={handleAdminLogin}
                >
                  Login
                </Button>
                <br />
                <Typography
                  variant='overline'
                  className={classes.forgotPassword}
                  color='inherit'
                >
                  Forgot Password?
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
