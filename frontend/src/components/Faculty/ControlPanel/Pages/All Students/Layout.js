import React, { useEffect, forwardRef, useState } from 'react';
import useStyles from './Style';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetAllStudents, patchStudent } from '../../../../../store/actions';
import {
  selectAllStudents,
  selectAlerts
} from '../../../../../store/selectors';
import { getFormattedString } from '../../../../../Helper';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  Snackbar
} from '@material-ui/core';
import { Edit, Delete, Close } from '@material-ui/icons';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AllStudents = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  const [state, setState] = useState({
    data: {},
    index: '',
    uId: ''
  });

  const [data, setData] = useState({
    name: '',
    sem: '',
    enrollmentId: '',
    email: '',
    phone: '',
    password: 'admin@123'
  });

  const handleClickOpen = (data, index, id) => {
    setState((prevState) => {
      return { ...prevState, data, index, uId: id };
    });
    setData({
      name: data.name,
      sem: data.sem,
      enrollmentId: data.enrollmentId,
      email: data.email,
      phone: data.phone
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await patchStudent(data, state.uId);
    setSnackBarOpen(open);
    GetAllStudents();
    setOpen(false);
  };

  const handleOnChange = (e) => {
    e.persist();
    setData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    GetAllStudents();
  }, []);

  // Retrieving Student Data from Redux
  const AllStudentsState = useSelector(selectAllStudents);
  const AlertState = useSelector(selectAlerts);
  const StudentsData = AllStudentsState.data;
  const isDataLoading = AllStudentsState.loading;

  const RenderAllStudents = () => {
    return (
      <Box component='div'>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <Grid container>
                  <Grid item xs={1}>
                    <TableCell>Sr. No. </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Name </TableCell>
                  </Grid>
                  <Grid item xs={1}>
                    <TableCell>Sem </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Enrollment ID </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Phone </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Project Name </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell> Update & Delete </TableCell>
                  </Grid>
                </Grid>
              </TableRow>
            </TableHead>
            <TableBody>
              {StudentsData &&
                StudentsData.map((data, index) => (
                  <TableRow key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <TableCell> {getFormattedString(index + 1)} </TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell> {getFormattedString(data.name)} </TableCell>
                      </Grid>
                      <Grid item xs={1}>
                        <TableCell>{getFormattedString(data.sem)}</TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell>
                          {getFormattedString(data.enrollmentId)}
                        </TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell>{getFormattedString(data.phone)}</TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell>
                          {data.projectGroupId
                            ? getFormattedString(
                                data.projectGroupId.projectName
                              )
                            : 'N/A'}
                        </TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell>
                          <div className={classes.iconSpacing}>
                            <Link
                              onClick={() =>
                                handleClickOpen(data, index, data._id)
                              }
                            >
                              <Edit color='primary' />
                            </Link>
                            <Link
                              onClick={() => console.log(`Clicked ${data._id}`)}
                            >
                              <Delete color='error' />
                            </Link>
                          </div>
                        </TableCell>
                      </Grid>
                    </Grid>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <form onSubmit={handleOnSubmit}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={handleClose}
                  aria-label='close'
                >
                  <Close />
                </IconButton>
                <Typography variant='h6' className={classes.title}>
                  Update Student Details
                </Typography>
                <Button autoFocus color='inherit' type='submit'>
                  Save
                </Button>
              </Toolbar>
            </AppBar>
            <Box component='div' className={classes.Form}>
              <Typography variant='h4'> Updation Form </Typography>
              <FormControl fullWidth={true} margin='normal' required>
                <TextField
                  onChange={handleOnChange}
                  defaultValue={state.data.name}
                  label='Student Name'
                  variant='filled'
                  name='name'
                  required
                  className={classes.margin}
                />
                <TextField
                  onChange={handleOnChange}
                  defaultValue={state.data.sem}
                  label='Student Semester'
                  variant='filled'
                  required
                  name='sem'
                  className={classes.margin}
                />
                <TextField
                  onChange={handleOnChange}
                  defaultValue={state.data.enrollmentId}
                  label='Student Enrollment Id'
                  variant='filled'
                  name='enrollmentId'
                  required
                  className={classes.margin}
                />
                <TextField
                  onChange={handleOnChange}
                  defaultValue={state.data.email}
                  label='Student Email Address'
                  type='email'
                  name='email'
                  variant='filled'
                  required
                  className={classes.margin}
                />
                <TextField
                  onChange={handleOnChange}
                  defaultValue={state.data.phone}
                  label='Student Phone (Whatsapp)'
                  variant='filled'
                  required
                  name='phone'
                  className={classes.margin}
                />
                <TextField
                  onChange={handleOnChange}
                  placeholder='Enter Your Password to Update'
                  label='Student Password'
                  variant='filled'
                  type='text'
                  name='password'
                  required
                  aria-describedby='my-helper-password'
                  className={classes.margin}
                />
                <FormHelperText id='my-helper-password'>
                  We'll never share your password.
                </FormHelperText>
              </FormControl>
            </Box>
          </form>
        </Dialog>
      </Box>
    );
  };

  // console.log(data);

  return isDataLoading ? (
    <Skeleton variant='rect' animation='wave' height={500} />
  ) : (
    <div>
      <h1>Get All Students</h1>
      <Snackbar
        open={snackBarOpen}
        transitionDuration={500}
        key={Math.random()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          classes: {
            root: AlertState.data !== null ? classes.success : classes.danger
          }
        }}
        TransitionComponent={Slide}
        message={!AlertState.loading && getFormattedString(AlertState.data)}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleSnackBarClose}
            >
              <Close fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      {RenderAllStudents()}
    </div>
  );
};

export default AllStudents;
