import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
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
} from "@material-ui/core";

import { AuthServices } from "../../../Services";
import { useHistory } from "react-router-dom";
import { selectStudent } from "../../../store/selectors";
import { useSelector } from "react-redux";
import { getFormattedString } from "../../../Helper";
import { getIndividualStudent } from "../../../store/actions";

import {
  PeopleAlt,
  AccountCircle,
  Person,
  GroupAdd,
  Group,
  SupervisedUserCircle,
  CloudUpload,
  EventNote,
  ExitToApp,
  Menu,
  ChevronLeft,
  ChevronRight
} from "@material-ui/icons";
import useStyles from "./Style";

// import StudentProfile from "./Profile";

const FacultyControlPanel = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isLogout, setLogout] = useState(false);

  const StudentDetails = useSelector(selectStudent);
  const Student = { ...StudentDetails.data };
  // console.log('CONTROL PANEL PAGE', Student);

  useEffect(() => {
    getIndividualStudent();
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
      await AuthServices.logout();
      setLogout(false);
      history.push("/facultylogin");
    } catch (err) {
      console.log("err", err);
    } finally {
      setLogout(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: "1" }} noWrap>
            Faculty Control Panel
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            disabled={isLogout}
          >
            <ExitToApp />
            {isLogout ? "Logging Out..." : "Logout"}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
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
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={1}>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText>All Faculty</ListItemText>
          </ListItem>
          <ListItem button key={2}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText>Faculty Login</ListItemText>
          </ListItem>
          <ListItem button key={3}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Individual Faculty</ListItemText>
          </ListItem>
          <ListItem button key={4}>
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText>Add New Project Group</ListItemText>
          </ListItem>
          <ListItem button key={5}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText>All Project Group</ListItemText>
          </ListItem>
          <ListItem button key={6}>
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText>Indiividual Faculty All Project Groups</ListItemText>
          </ListItem>
          <ListItem button key={7}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Individual Project Group</ListItemText>
          </ListItem>
          <ListItem button key={8}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Delete Project Group</ListItemText>
          </ListItem>
          <ListItem button key={9}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Delete Project File</ListItemText>
          </ListItem>
          <ListItem button key={10}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Students Uploaded File</ListItemText>
          </ListItem>
          <ListItem button key={11}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Upload E-Notice</ListItemText>
          </ListItem>
          <ListItem button key={12}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Generate E-Report</ListItemText>
          </ListItem>
          <ListItem button key={13}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Add New Student</ListItemText>
          </ListItem>
          <ListItem button key={14}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>Student Details</ListItemText>
          </ListItem>
          <ListItem button key={15}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText>All Students</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
};

export default FacultyControlPanel;
