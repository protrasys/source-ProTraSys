import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@material-ui/core';
import useStyles from './Style';
import Moment from 'react-moment';
import { getFormattedString } from '../../../../../Helper';
import { selectStudent } from '../../../../../store/selectors';
import { useSelector } from 'react-redux';

const StudnetProfile = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const Student = { ...StudentData.student };
  const projectGroup = { ...StudentData.group };
  const TechnologiesUsedInProject = { ...projectGroup.technology };

  // It Saves value captured from Object
  const techArray = [];

  // This function will generate values from array
  Object.entries(TechnologiesUsedInProject).forEach(([key, value]) => {
    techArray.push(value);
  });

  console.log(projectGroup.teamLeaderv);

  return (
    <div>
      <Typography variant='h3'>
        Welcome {getFormattedString(Student.name)}
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.whiteFont}>Full Name </TableCell>
              <TableCell className={classes.whiteFont}>E-Mail </TableCell>
              <TableCell className={classes.whiteFont}>Enrollment Id</TableCell>
              <TableCell className={classes.whiteFont}>Phone </TableCell>
              <TableCell className={classes.whiteFont}>Sem </TableCell>
              <TableCell className={classes.whiteFont}>
                Registered Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> {getFormattedString(Student.name)} </TableCell>
              <TableCell> {getFormattedString(Student.email)} </TableCell>
              <TableCell>{getFormattedString(Student.enrollmentId)}</TableCell>
              <TableCell> {getFormattedString(Student.phone)} </TableCell>
              <TableCell> {getFormattedString(Student.sem)} </TableCell>
              <TableCell>
                <Moment format='DD/MM/YYYY'>
                  {getFormattedString(Student.createdAt)}
                </Moment>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Box component='div'>
        <Typography variant='h4' className={classes.center}>
          Project Group Details
        </Typography>
        <Paper square className={classes.paperRoot}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name: </TableCell>
                  <TableCell>
                    {getFormattedString(projectGroup.projectName)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Definition: </TableCell>
                  <TableCell>
                    {getFormattedString(projectGroup.definition)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Technologies Used: </TableCell>
                  <TableCell>
                    {techArray.map((data) => (
                      <span> {data} </span>
                    ))}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant='h6' className={classes.right}>
                      Group Created At :
                      <Moment format='DD/MM/YYYY'>
                        {getFormattedString(projectGroup.createdAt)}
                      </Moment>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default StudnetProfile;
