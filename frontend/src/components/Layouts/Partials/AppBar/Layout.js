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
  Button
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import useStyles from './Style';
import ProTraSysLogo from '../../../../assets/ProTraSys_Logo.png';

function ButtonAppBar(props) {
  const classes = useStyles();
  const { AppBarColor, title } = props;

  const [drawerActivate, setDrawerActivate] = useState(false);
  const [drawer, setDrawer] = useState(false);

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

  // For Small Screens
  const createDrawer = () => {
    return (
      <Fragment>
        <AppBar
          color={AppBarColor}
          position='static'
          variant='outlined'
          className={classes.appbar}
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
                  Login
                </Button>
              </ListItem>
              <ListItem key={3} button divider>
                <Button disableElevation color='secondary' variant='outlined'>
                  Signup
                </Button>
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
              <Button disableElevation color='primary' variant='text'>
                Notice Board
              </Button>
            </Typography>
            <Typography
              variant='subtitle2'
              className={classes.padding}
              color='inherit'
            >
              <Button disableElevation color='primary' variant='outlined'>
                Faculty Corner
              </Button>
            </Typography>
            <Typography
              variant='subtitle2'
              className={classes.padding}
              color='inherit'
            >
              <Button disableElevation color='primary' variant='contained'>
                Student Corner
              </Button>
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
