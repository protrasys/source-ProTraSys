import React, { useState } from 'react';
import {
  Box,
  CardContent,
  CardActions,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput
} from '@material-ui/core';
import Logo from '../../../../../assets/ProTraSys_Logo.png';
import useStyles from './Style';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import { AuthServices } from '../../../../../Services';

import { useHistory } from 'react-router-dom';

const Password = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLogin, setLogin] = useState(false);

  const { prevStep, handleChange, values } = props;

  const [showPassword, setShowPassword] = useState(false);

  const Prev = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleLogin = async () => {
    try {
      setLogin(true);
      await AuthServices.FacultyLogin(values.enrollmentId, values.password);
      setLogin(false);
      history.push('/facultycontrolpanel');
    } catch (err) {
      console.log('err', err);
      setLogin(false);
    } finally {
      values.enrollmentId = '';
      values.password = '';
      setLogin(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <CardContent className={classes.cardContent}>
        <div>
          <img src={Logo} alt='ProTraSys' className={classes.logo} />
          <Typography variant='h5'>Welcome</Typography>
          <Box component='div' className={classes.IconButton}>
            <Box component='div' className={classes.IconEnrollment}>
              <AccountCircle /> {values.enrollmentId}
            </Box>
          </Box>
        </div>
        <div>
          <FormControl variant='outlined' className={classes.FormControl}>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              fullWidth={true}
              type={showPassword ? 'text' : 'password'}
              name='password'
              required
              onChange={handleChange}
              defaultValue={values.password}
              placeholder='Enter Your Credentials'
              labelWidth={70}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </CardContent>

      <CardActions className={classes.cardAction}>
        <Button
          className={classes.submitButton}
          variant='contained'
          color='primary'
          onClick={Prev}
        >
          Back
        </Button>
        <Button
          className={classes.submitButton}
          variant='contained'
          color='primary'
          onClick={handleLogin}
          disabled={isLogin}
        >
          {isLogin ? 'Signing in...' : 'Sign in'}
        </Button>
      </CardActions>
    </div>
  );
};

export default Password;
