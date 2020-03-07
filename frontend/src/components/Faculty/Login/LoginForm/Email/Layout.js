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
import { HomeOutlined } from '@material-ui/icons';
import Logo from '../../../../../assets/ProTraSys_Logo.png';
import useStyles from './Style';
import { Link } from 'react-router-dom';

const Email = (props) => {
  const classes = useStyles();
  const { nextStep, handleChange, values } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
              Use your Faculty Account
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
              placeholder='Faculty Enrollment ID Only'
              margin='normal'
              size='medium'
              label='Enrollment ID'
            />
            <Typography className={classes.forgotLinkText} color='primary'>
              <b onClick={handleClick} className={classes.Link}>
                Don't have Faculty Account?
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
          <Link to='/' className={classes.Link}>
            <Button
              className={classes.submitButton}
              variant='contained'
              color='primary'
            >
              <HomeOutlined />
            </Button>
          </Link>
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
            Sorry, for the inconvenience... <br /> Please Contact to Admin for
            Opening new Faculty Account
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default Email;
