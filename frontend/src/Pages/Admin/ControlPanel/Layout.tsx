import React, { useState, useEffect, Fragment } from 'react';
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
  MenuItem,
} from '@material-ui/core';
import {
  Menu,
  ExitToApp,
  SchoolOutlined,
  DashboardOutlined,
  LocalLibraryOutlined,
  GroupWorkOutlined,
  SettingsApplicationsOutlined,
  PowerOutlined,
  FileCopyOutlined,
  NotificationsActiveOutlined,
  AssessmentOutlined,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import {
  fetchCountAllDocuments,
  getIndividualAdmin,
  fetchAllAdminAction,
  fetchAllData,
} from '../../../Store/actions';
import {
  selectCountedAllDocuments,
  selectAdmin,
  selectAllAdmins,
  selectAllData,
} from '../../../Store/selectors';
import { useSelector } from 'react-redux';
import useStyles from './Style';

import { AuthServices } from '../../../Services';
import { useHistory } from 'react-router-dom';

// Importing Custom Pages Here
import AdminDashboard from './Pages/Dashboard';
import StudentsPage from './Pages/Students';
import FacultyPage from './Pages/Faculties';
import ManageAdmins from './Pages/ManageAdmins';
import ProjectGroupPage from './Pages/ProjectGroups';
import ProjectFilesPage from './Pages/ProjectFiles';
import ENoticePage from './Pages/ENotices';
import EReportPage from './Pages/EReports';

// Custom Components
import SearchBar from '../../../components/SearchBar';

function AdminControlPanel(props: any) {
  const { container } = props;
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const allDocumentsState = useSelector(selectCountedAllDocuments);
  const adminState = useSelector(selectAdmin);
  const allAdminState = useSelector(selectAllAdmins);
  const allDataState = useSelector(selectAllData);
  const loading =
    allDocumentsState.loading ||
    adminState.loading ||
    allAdminState.loading ||
    allDataState.loading;
  const data = { ...allDocumentsState.data };
  const adminData = { ...adminState.data };
  const allAdminData = { ...allAdminState.data };
  const allData = { ...allDataState.data };

  useEffect(() => {
    document.title = `Welcome Admin`;
    getIndividualAdmin();
    fetchCountAllDocuments();
    fetchAllAdminAction();
    fetchAllData();
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  var [bl, battery_level] = useState<string>();
  var [cs, chargingStatus] = useState<string>();

  let navigator: any = window.navigator;
  navigator.getBattery().then(function (battery: any) {
    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
    }
    updateAllBatteryInfo();

    battery.addEventListener('chargingchange', function () {
      updateChargeInfo();
    });
    function updateChargeInfo() {
      chargingStatus(battery.charging);
    }

    battery.addEventListener('levelchange', function () {
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

  const handleSearchBar = (value: string) => {
    console.log(value);
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
              <FileCopyOutlined />
            </ListItemIcon>
            <ListItemText>Project Files</ListItemText>
          </ListItem>
        </div>
        <div onClick={() => setStep(6)}>
          <ListItem button key={6}>
            <ListItemIcon className={classes.listItem}>
              <NotificationsActiveOutlined />
            </ListItemIcon>
            <ListItemText>Notices</ListItemText>
          </ListItem>
        </div>
        <div onClick={() => setStep(7)}>
          <ListItem button key={7}>
            <ListItemIcon className={classes.listItem}>
              <AssessmentOutlined />
            </ListItemIcon>
            <ListItemText>Reportings</ListItemText>
          </ListItem>
        </div>
        <div onClick={() => setStep(8)}>
          <ListItem button key={8}>
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
            <SearchBar
              placeholder='Search Anything...'
              fontWeight='500'
              onSearch={handleSearchBar}
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
              paper: cs ? classes.chargingDrawerPaper : classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: cs ? classes.chargingDrawerPaper : classes.drawerPaper,
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
        {loading ? (
          <Skeleton height={700} variant='rect' animation='wave' />
        ) : (
          <Fragment>
            {step === 1 && <AdminDashboard data={data} adminData={adminData} />}
            {step === 2 && <StudentsPage data={allData} />}
            {step === 3 && <FacultyPage data={allData} />}
            {step === 4 && <ProjectGroupPage data={allData} />}
            {step === 5 && <ProjectFilesPage data={allData} />}
            {step === 6 && <ENoticePage data={allData} />}
            {step === 7 && <EReportPage data={allData} />}
            {step === 8 && <ManageAdmins data={allAdminData} />}
          </Fragment>
        )}
      </main>
    </div>
  );
}

export default AdminControlPanel;
