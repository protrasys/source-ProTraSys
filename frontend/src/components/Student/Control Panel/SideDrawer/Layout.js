import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core';

import { getFormattedString } from '../../../../Helper';
import { AuthServices } from '../../../../Services';
import { useHistory } from 'react-router-dom';
import { selectStudent } from '../../../../store/selectors';
import { useSelector } from 'react-redux';
import { getIndividualStudent } from '../../../../store/actions';

import { Switch, Route as InnerRoutes } from 'react-router-dom';

import Routes from '../routes';

import {
  Face,
  CloudUpload,
  EventNote,
  ExitToApp,
  Menu,
  ChevronLeft,
  ChevronRight
} from '@material-ui/icons';
import useStyles from './Style';

const SideDrawer = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isLogout, setLogout] = useState(false);

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const Student = { ...StudentData.student };
  // console.log('CONTROL PANEL PAGE', Student);

  // Getting Student Details from Database (Redux)
  useEffect(() => {
    getIndividualStudent();
  }, []);

  // Title of the Page
  useEffect(() => {
    document.title = `Welcome, ${getFormattedString(Student.name)} `;
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      setLogout(true);
      await AuthServices.logout();
      setLogout(false);
      history.push('/studentlogin');
    } catch (err) {
      console.log('err', err);
    } finally {
      setLogout(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' style={{ flexGrow: '1' }} noWrap>
            Studnet Control Panel
          </Typography>
          <Button
            color='inherit'
            variant='outlined'
            onClick={handleLogout}
            disabled={isLogout}
          >
            <ExitToApp />
            {isLogout ? 'Logging Out...' : 'Logout'}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <div onClick={() => history.push('/studentcontrolpanel')}>
            <ListItem button key={1}>
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => history.push('/fileupload')}>
            <ListItem button key={2}>
              <ListItemIcon>
                <CloudUpload />
              </ListItemIcon>
              <ListItemText>Upload File</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => history.push('/viewenotice')}>
            <ListItem button key={3}>
              <ListItemIcon>
                <EventNote />
              </ListItemIcon>
              <ListItemText>View E Notice</ListItemText>
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <InnerRoutes component={Routes} />
        </Switch>
      </main>
    </div>
  );
};

export default SideDrawer;
