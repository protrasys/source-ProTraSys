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
  Button,
} from '@material-ui/core';
import { AuthServices } from '../../../Services';
import { useHistory } from 'react-router-dom';
import { getIndividualFaculty } from '../../../Store/actions';
import {
  PeopleAlt,
  AccountCircle,
  GroupAdd,
  ExitToApp,
  Menu,
  Pageview,
  ChevronLeft,
  ChevronRight,
  GroupWork,
  PostAdd,
  PersonAdd,
  LocalLibrary,
} from '@material-ui/icons';
import useStyles from './Style';
import { selectFaculty } from '../../../Store/selectors';
import { useSelector } from 'react-redux';

// Importing Custom Pages here
import FacultyProfile from './Pages/Profile';
import AllFaculty from './Pages/AllFaculty';
import AddProjectGroup from './Pages/AddProjectGroup';
import ViewAllGroups from './Pages/ViewAllGroups';
import MineProjectGroups from './Pages/My Project Groups';
import AddENotice from './Pages/Add E Notice';
import AddNewStudent from './Pages/AddStudent';
import GetAllStudents from './Pages/All Students';

const FacultyControlPanel = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [step, setStep] = useState(1);

  const FacultyDetails = useSelector(selectFaculty);
  const Faculty = { ...FacultyDetails.data };

  useEffect(() => {
    document.title = `Welcome ${!FacultyDetails.loading ? Faculty.name : ''}`;
  });

  useEffect(() => {
    getIndividualFaculty();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      setLogout(true);
      await AuthServices.facultyLogout();
      setLogout(false);
      history.push('/facultylogin');
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
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' style={{ flexGrow: '1' }} noWrap>
            Faculty Control Panel
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
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
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
                <AccountCircle />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(2)}>
            <ListItem button key={2}>
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText>All Faculties</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(3)}>
            <ListItem button key={3}>
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText>Add Project Group</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(4)}>
            <ListItem button key={4}>
              <ListItemIcon>
                <Pageview />
              </ListItemIcon>
              <ListItemText>View All Group</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(5)}>
            <ListItem button key={5}>
              <ListItemIcon>
                <GroupWork />
              </ListItemIcon>
              <ListItemText>Mine Groups</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(6)}>
            <ListItem button key={6}>
              <ListItemIcon>
                <PostAdd />
              </ListItemIcon>
              <ListItemText>Add New Notice</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(7)}>
            <ListItem button key={7}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText>Add New Student</ListItemText>
            </ListItem>
          </div>
          <div onClick={() => setStep(8)}>
            <ListItem button key={8}>
              <ListItemIcon>
                <LocalLibrary />
              </ListItemIcon>
              <ListItemText>All Students</ListItemText>
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {step === 1 && <FacultyProfile />}
        {step === 2 && <AllFaculty />}
        {step === 3 && <AddProjectGroup />}
        {step === 4 && <ViewAllGroups />}
        {step === 5 && <MineProjectGroups />}
        {step === 6 && <AddENotice />}
        {step === 7 && <AddNewStudent />}
        {step === 8 && <GetAllStudents />}
      </main>
    </div>
  );
};

export default FacultyControlPanel;
