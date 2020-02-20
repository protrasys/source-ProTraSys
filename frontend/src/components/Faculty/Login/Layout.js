import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Popover
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './Style';
import Logo from '../../../assets/ProTraSys_Logo.png';

const FacultyLogin = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  useEffect(() => {
    document.title = 'Login - Faculty Accounts';
  }, []);

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

  return (
    <Box className={classes.root} component='div'>
      <Card className={classes.Card}>
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
              required
              placeholder='Faculty Enrollment ID Only'
              margin='normal'
              size='medium'
              label='Enrollment ID'
            />
            <Typography className={classes.forgotLinkText} color='primary'>
              <Link onClick={handleClick} className={classes.Link}>
                What is enrollment Id?
              </Link>
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
            <Link onClick={handleClick2} className={classes.Link}>
              Don't have an account
            </Link>
          </Typography>
          <Button
            className={classes.submitButton}
            variant='contained'
            color='primary'
          >
            Next
          </Button>
        </CardActions>
      </Card>

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
            Sorry, for the inconvenience... <br /> Please Contact to
            Administrator for Opening Faculty Account
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default FacultyLogin;
