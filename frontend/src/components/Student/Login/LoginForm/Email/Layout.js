import React, { useState } from 'react';
import {
  Box,
  CardContent,
  CardActions,
  Button,
  TextField,
  Popover,
  Typography
} from '@material-ui/core';
import Logo from '../../../../../assets/ProTraSys_Logo.png';
import useStyles from './Style';

const Email = (props) => {
  const classes = useStyles();
  const { nextStep, handleChange, values } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <Box component='div'>
      <form onSubmit={Continue}>
        <CardContent className={classes.cardContent}>
          <Box component='div'>
            <img src={Logo} alt='ProTraSys' className={classes.logo} />
            <Typography variant='h5'>Sign In</Typography>
            <Typography variant='subtitle1'>
              Use your Student Account
            </Typography>
          </Box>
          <Box component='div'>
            <TextField
              variant='outlined'
              fullWidth
              type='text'
              name='enrollmentId'
              required
              onChange={handleChange}
              defaultValue={values.enrollmentId}
              placeholder='Student Enrollment ID Only'
              margin='normal'
              size='medium'
              label='Enrollment ID'
            />
            <Typography className={classes.forgotLinkText} color='primary'>
              <b onClick={handleClick} className={classes.Link}>
                What is enrollment Id?
              </b>
            </Typography>
            <Typography color='textPrimary' className={classes.Caption}>
              Not your computer? Use Guest mode to sign in privately.
            </Typography>
            <Typography className={classes.forgotLinkText} color='primary'>
              <a
                href='https://support.google.com/chrome/answer/6130773?hl=en'
                className={classes.Link}
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn More
              </a>
            </Typography>
          </Box>
        </CardContent>

        <CardActions className={classes.cardAction}>
          <Typography className={classes.forgotLinkText} color='primary'>
            <b onClick={handleClick2} className={classes.Link}>
              Don't have an account
            </b>
          </Typography>
          <Button
            className={classes.submitButton}
            variant='contained'
            color='primary'
            type='submit'
          >
            Next
          </Button>
        </CardActions>
      </form>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box>
          <Typography variant='subtitle2' className={classes.popover}>
            Enrollment ID can be found in your I-Card
          </Typography>
        </Box>
      </Popover>

      <Popover
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box>
          <Typography variant='subtitle2' className={classes.popover}>
            Sorry, for the inconvenience... <br /> Please Contact to your
            respective Project Guide for Opening Student Account
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default Email;
