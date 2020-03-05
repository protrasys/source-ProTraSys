import React, { useState, useEffect, Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Box,
  Grid,
  SwipeableDrawer,
  Button,
  Snackbar,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import useStyles from './Style';
import ProTraSysLogo from '../../../../assets/ProTraSys_Logo.png';
import { Link } from 'react-router-dom';

function ButtonAppBar(props) {
  const classes = useStyles();
  const { AppBarColor, title } = props;

  const [drawerActivate, setDrawerActivate] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [write, setWrite] = useState(false);
  
  useEffect(() => {
    if (window.innerWidth <= 600) {
      setDrawerActivate(true);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 600) {
        setDrawerActivate(true);
      } else {
        setDrawerActivate(false);
      }
    });
  }, []);

  const handleClick = () => {    
    setOpen(true); 
  }

  const  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const writeInput = () =>  {
    setWrite(true);
  }

  const textWrite = () =>{
    const myInput = document.getElementById('myInput').value;
    const myPara = document.getElementById('myPara').innerHTML = myInput;
  }

  

  // For Small Screens
  const createDrawer = () => {

    return (
      <Fragment>
        <AppBar
          className={classes.appbar}
          color={AppBarColor}
          position='static'
          variant='outlined'
        >
          <Toolbar>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Menu
                color='inherit'
                className={classes.sideBarIcon}
                onClick={() => setDrawer(true)}
              />
              <Typography color='primary' variant='h4'>
                {title}
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          <Box
            tabIndex={0}
            role='button'
            onClick={() => setDrawer(false)}
            onKeyDown={() => setDrawer(false)}
          >
            <List className={classes.list}>
              <ListItem key={1} button>
                <img src={ProTraSysLogo} height={80} alt='ProTraSys' />
              </ListItem>
              <ListItem key={2} button divider>
                <Button disableElevation color='primary' variant='contained'>
                  Notice Board
                </Button>
              </ListItem>
              <ListItem key={3} button divider>
                <Link to='/facultylogin'>
                  <Button disableElevation color='primary' variant='contained'>
                    Faculty Corner
                  </Button>
                </Link>
              </ListItem>
              <ListItem key={4} button divider>
                <Link to='/studentlogin' className={classes.Link}>
                  <Button disableElevation color='primary' variant='contained'>
                    Student Corner
                  </Button>
                </Link>
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>
      </Fragment>
    );
  };

  // For Larger Screens
  const destroyDrawer = () => {
    return (
      <Box>
        <AppBar
          color={AppBarColor}
          variant='outlined'
          position='static'
          className={classes.appbar}
        >
          <Toolbar>
            <Typography variant='h4' style={{ flexGrow: 1 }} color='primary'>
              {title}
            </Typography>
            <Typography
              variant='subtitle2'
              className={classes.padding}
              color='inherit'
            >
              <Button
                disableElevation
                color='primary'
                variant='text'
                size='large'
                onClick={handleClick}
                >
                  Notice Board
              </Button>
              <Snackbar open={open} autoHideDuration={60000} onClose={handleClose} className={classes.notification}>
                <Alert onClose={handleClose} severity="success">npm 
                  <FormControl>
                    <InputLabel htmlFor="my-input" onKeyPress={setWrite}>Enter Notice here...</InputLabel>
                    <Input id="myInput" aria-describedby="my-helper-text" onKeyPress={textWrite} /><br />
                  </FormControl>  
                  <p id="myPara"></p>                  
                </Alert>
              </Snackbar>
            </Typography>
            <Typography
              variant='subtitle2'
              className={classes.padding}
              color='inherit'
            >
              <Link to='/facultylogin' className={classes.Link}>
                <Button disableElevation color='primary' variant='outlined'>
                  Faculty Corner
                </Button>
              </Link>
            </Typography>
            <Typography
              variant='subtitle2'
              className={classes.padding}
              color='inherit'
            >
              <Link to='/studentlogin' className={classes.Link}>
                <Button
                  disableElevation
                  color='primary'
                  variant='contained'
                  size='large'
                >
                  Student Corner
                </Button>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  return (
    <Fragment>
      <Box component='div'>
        {drawerActivate ? createDrawer() : destroyDrawer()}
      </Box>
    </Fragment>
  );
}

ButtonAppBar.defaultProps = {
  AppBarColor: 'transparent',
  title: 'P̾r̾o̾T̾r̾a̾S̾y̾s̾',
  tagline: 'Project Tracking System'
};

export default ButtonAppBar;
