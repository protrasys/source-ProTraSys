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
import { AuthServices } from '../../../../Services';
import { useHistory } from 'react-router-dom';
import { selectStudent } from '../../../../store/selectors';
import { useSelector } from 'react-redux';
import { getIndividualStudent } from '../../../../store/actions';
import {
  Face,
  CloudUpload,
  EventNote,
  ExitToApp,
  Menu,
  ChevronLeft,
  ChevronRight,
  Receipt,
  ViewCarousel
} from '@material-ui/icons';
import useStyles from './Style';

// Importing Components
import ProfileComponent from '../Pages/Profile';
import FileUploadComponent from '../Pages/FileUpload';
import ViewENoticeComponent from '../Pages/ViewENotice';
import MyReportings from '../Pages/MyReportings';
import ViewFiles from '../Pages/ViewFiles';

const SideDrawer = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [step, setStep] = useState(1);

  const StudentDetails = useSelector(selectStudent);
  const isStudentLoaded = StudentDetails.loading;
  const StudentData = { ...StudentDetails.data };
  const Student = { ...StudentData.student };

  // Getting Student Details from Database (Redux)
  useEffect(() => {
    getIndividualStudent();
  }, []);

  // Title of the Page
  useEffect(() => {
    document.title = `Welcome ${isStudentLoaded ? '' : Student.name} `;
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
          <div onClick={() => setStep(1)}>
            <ListItem button key={1}>
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(2)}>
            <ListItem button key={2}>
              <ListItemIcon>
                <CloudUpload />
              </ListItemIcon>
              <ListItemText>Upload File</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(3)}>
            <ListItem button key={3}>
              <ListItemIcon>
                <EventNote />
              </ListItemIcon>
              <ListItemText>View E Notice</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(4)}>
            <ListItem button key={4}>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText>My Reportings</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(5)}>
            <ListItem button key={5}>
              <ListItemIcon>
                <ViewCarousel />
              </ListItemIcon>
              <ListItemText>View Files</ListItemText>
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {step === 1 && <ProfileComponent />}
        {step === 2 && <FileUploadComponent />}
        {step === 3 && <ViewENoticeComponent />}
        {step === 4 && <MyReportings />}
        {step === 5 && <ViewFiles />}
      </main>
    </div>
  );
};

export default SideDrawer;
