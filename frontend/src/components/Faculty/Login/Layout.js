import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './Style';
import Logo from '../../../assets/ProTraSys_Logo.png';

const FacultyLogin = () => {
  const classes = useStyles();

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
              margin='normal'
              size='medium'
              label='Enrollment ID'
            />
            <Typography className={classes.forgotLinkText} color='primary'>
              <Link to='/' className={classes.Link}>
                Forgot enrollment Id?
              </Link>
            </Typography>
            <Typography color='textPrimary' className={classes.Caption}>
              Not your computer? Use Guest mode to sign in privately.
            </Typography>
          </Box>
        </CardContent>

        <CardActions>
          <Button variant='contained' color='primary'>
            Next
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FacultyLogin;
