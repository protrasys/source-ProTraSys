import React, { useState, useEffect } from 'react';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  InputBase,
  MenuItem
} from '@material-ui/core';
import {
  Menu,
  Search,
  ExitToApp,
  SchoolOutlined,
  DashboardOutlined,
  LocalLibraryOutlined,
  GroupWorkOutlined,
  SettingsApplicationsOutlined,
  PowerOutlined
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './Style';

import { AuthServices } from '../../../Services';
import { useHistory } from 'react-router-dom';

// Importing Custom Pages Here
import AdminDashboard from './Pages/Dashboard';
import StudentsPage from './Pages/Students';
import FacultyPage from './Pages/Faculties';
import ManageAdmins from './Pages/ManageAdmins';
import ProjectGroupPage from './Pages/ProjectGroups';

function AdminControlPanel(props) {
  const { container } = props;
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    document.title = `Welcome Admin`;
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  var [bl, battery_level] = useState();
  var [cs, chargingStatus] = useState();

  navigator.getBattery().then(function(battery) {
    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
    }
    updateAllBatteryInfo();

    battery.addEventListener('chargingchange', function() {
      updateChargeInfo();
    });
    function updateChargeInfo() {
      chargingStatus(battery.charging);
    }

    battery.addEventListener('levelchange', function() {
      updateLevelInfo();
    });
    function updateLevelInfo() {
      battery_level(`${Math.ceil(battery.level * 100)}%`);
    }
  });

  const handleLogout = async () => {
    try {
      await AuthServices.adminLogout();
      history.push('/adminlogin');
    } catch (err) {
      console.log('err', err);
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <div onClick={() => setStep(1)}>
          <ListItem button key={1}>
            <ListItemIcon className={classes.listItem}>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText>My Dashboard</ListItemText>
          </ListItem>
        </div>
        <div onClick={() => setStep(2)}>
          <ListItem button key={2}>
            <ListItemIcon className={classes.listItem}>
              <SchoolOutlined />
            </ListItemIcon>
            <ListItemText>Students</ListItemText>
          </ListItem>
        </div>
        <div onClick={() => setStep(3)}>
          <ListItem button key={3}>
            <ListItemIcon className={classes.listItem}>
              <LocalLibraryOutlined />
            </ListItemIcon>
            <ListItemText>Faculties</ListItemText>
          </ListItem>
        </div>
        <div onClick={() => setStep(4)}>
          <ListItem button key={4}>
            <ListItemIcon className={classes.listItem}>
              <GroupWorkOutlined />
            </ListItemIcon>
            <ListItemText>Project Groups</ListItemText>
          </ListItem>
        </div>
        <div onClick={() => setStep(5)}>
          <ListItem button key={5}>
            <ListItemIcon className={classes.listItem}>
              <SettingsApplicationsOutlined />
            </ListItemIcon>
            <ListItemText>Manage Admins</ListItemText>
          </ListItem>
        </div>
        <Divider />
        <div className={classes.batteryStatus}>
          <Typography>
            <Typography> {cs ? bl : ''} </Typography>
            {cs ? (
              <div className={classes.chargingStatus}>
                <span>Charging</span>
                <PowerOutlined />
              </div>
            ) : (
              ''
            )}
          </Typography>
        </div>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' color='default' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant='h5' noWrap>
            Admin Control Panel
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div onClick={handleLogout}>
            <MenuItem>
              <IconButton color='inherit'>
                <ExitToApp />
              </IconButton>
            </MenuItem>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: cs ? classes.chargingDrawerPaper : classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: cs ? classes.chargingDrawerPaper : classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {step === 1 && <AdminDashboard />}
        {step === 2 && <StudentsPage />}
        {step === 3 && <FacultyPage />}
        {step === 4 && <ProjectGroupPage />}
        {step === 5 && <ManageAdmins />}
      </main>
    </div>
  );
}

export default AdminControlPanel;
