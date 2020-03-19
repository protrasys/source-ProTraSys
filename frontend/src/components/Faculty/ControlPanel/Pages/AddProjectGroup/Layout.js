import React, { useState, useEffect } from "react";
import useStyles from "./Style";
import { Skeleton } from "@material-ui/lab";
import { getFormattedString } from "../../../../../Helper";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import {
  GetAllStudents,
  AddNewProjectGroup
} from "../../../../../store/actions";
import {
  selectAllStudents,
  selectAlerts
} from "../../../../../store/selectors";
import {
  useMediaQuery,
  Snackbar,
  IconButton,
  Slide,
  Box,
  TextField,
  Select,
  Card,
  CardContent,
  CardActions,
  Typography,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Button
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ProTraSys from "../../../../../assets/ProTraSys_Logo.png";

const AddProjectGroup = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    GetAllStudents();
  }, []);

  const AllStudentState = useSelector(selectAllStudents);
  const AlertState = useSelector(selectAlerts);
  const isStudentsLoading = AllStudentState.loading;
  const StudentsData = AllStudentState.data;

  const [state, setState] = useState({
    projectName: "",
    definition: "",
    stu01: "",
    stu02: "",
    stu03: "",
    stu04: "",
    technology: "",
    teamLeader: ""
  });

  const handleValueChange = e => {
    e.persist();
    setState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    await AddNewProjectGroup(state);
    setOpen(true);
    setState({
      projectName: "",
      definition: "",
      stu01: "",
      stu02: "",
      stu03: "",
      stu04: "",
      technology: "",
      teamLeader: ""
    });
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));

  return isStudentsLoading ? (
    <Skeleton variant="rect" animation="wave" height={500} />
  ) : (
    <div>
      <Snackbar
        open={open}
        transitionDuration={500}
        key={Math.random()}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        ContentProps={{
          classes: {
            root: AlertState.data !== null ? classes.success : classes.danger
          }
        }}
        TransitionComponent={Slide}
        message={!AlertState.loading && AlertState.data}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <h1>Add New Project Group</h1>
      <Box variant="div" className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Box style={{ textAlign: "center" }}>
              <img src={ProTraSys} alt="Logo" className={classes.img} />
              <Typography className={classes.text} color="inherit">
                Add New Project Group
              </Typography>
            </Box>
            <form onSubmit={handleFormSubmit} className={classes.form}>
              <TextField
                type="text"
                name="projectName"
                onChange={handleValueChange}
                value={state.projectName}
                placeholder="Enter Project Name"
                required
                fullWidth="true"
                label="Project Name"
                variant="outlined"
                className={classes.formControl}
                size={mobileView}
              ></TextField>
              <TextField
                type="text"
                onChange={handleValueChange}
                value={state.definition}
                name="definition"
                placeholder="Enter Project Defintion"
                required
                fullWidth="true"
                label="Project Definition"
                variant="outlined"
                className={classes.formControl}
              ></TextField>
              <TextField
                type="text"
                onChange={handleValueChange}
                value={state.technology}
                name="technology"
                placeholder='Enter Project Technologies sepreated by Coma ","'
                required
                fullWidth="true"
                label="Project Technologies"
                variant="outlined"
                className={classes.formControl}
              ></TextField>

              <FormControl
                variant="outlined"
                fullWidth="true"
                className={classes.formControl}
              >
                <InputLabel>Student 01</InputLabel>
                <Select
                  name="stu01"
                  onChange={handleValueChange}
                  defaultChecked={0}
                  required
                >
                  <MenuItem disabled selected>
                    -- Select Student 01 --
                  </MenuItem>
                  {StudentsData &&
                    StudentsData.map((data, index) => (
                      <MenuItem key={index} name="stu01" value={data._id}>
                        {getFormattedString(data.name)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth="true"
                className={classes.formControl}
              >
                <InputLabel>Student 02</InputLabel>
                <Select
                  name="stu02"
                  onChange={handleValueChange}
                  defaultChecked={0}
                  required
                >
                  <MenuItem disabled selected>
                    -- Select Student 02 --
                  </MenuItem>
                  {StudentsData &&
                    StudentsData.map((data, index) => (
                      <MenuItem key={index} name="stu02" value={data._id}>
                        {getFormattedString(data.name)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth="true"
                className={classes.formControl}
              >
                <InputLabel>Student 03</InputLabel>
                <Select
                  name="stu03"
                  onChange={handleValueChange}
                  defaultChecked={0}
                  required
                >
                  <MenuItem disabled selected>
                    -- Select Student 03 --
                  </MenuItem>
                  {StudentsData &&
                    StudentsData.map((data, index) => (
                      <MenuItem key={index} name="stu03" value={data._id}>
                        {getFormattedString(data.name)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth="true"
                className={classes.formControl}
              >
                <InputLabel>Student 04</InputLabel>
                <Select
                  name="stu04"
                  onChange={handleValueChange}
                  defaultChecked={0}
                  required
                >
                  <MenuItem disabled selected>
                    -- Select Student 04 --
                  </MenuItem>
                  {StudentsData &&
                    StudentsData.map((data, index) => (
                      <MenuItem key={index} name="stu04" value={data._id}>
                        {getFormattedString(data.name)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth="true"
                className={classes.formControl}
              >
                <InputLabel>TeamLeader</InputLabel>
                <Select
                  name="teamLeader"
                  onChange={handleValueChange}
                  defaultChecked={0}
                  required
                >
                  <MenuItem disabled selected>
                    -- Select Team Leader --
                  </MenuItem>
                  {StudentsData &&
                    StudentsData.map((data, index) => (
                      <MenuItem key={index} name="teamLeader" value={data._id}>
                        {getFormattedString(data.name)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              className={classes.btn}
              variant="contained"
              size="large"
            >
              Add Group
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default AddProjectGroup;
