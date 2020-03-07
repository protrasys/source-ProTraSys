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
import { Skeleton } from '@material-ui/lab';
import useStyles from './Style';
import Moment from 'react-moment';
import { getFormattedString } from '../../../../../Helper';

// Redux Integration Dependencies
import { selectStudent } from '../../../../../store/selectors';
import { useSelector } from 'react-redux';

const StudnetProfile = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);

  const isStudentLoading = StudentDetails.loading;

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

  // Lets Destructuring the Teamleader and Other Student Details
  const teamLeader = { ...projectGroup.teamLeader };
  const Stu01 = { ...projectGroup.stu01 };
  const Stu02 = { ...projectGroup.stu02 };
  const Stu03 = { ...projectGroup.stu03 };
  const Stu04 = { ...projectGroup.stu04 };
  const faculty = { ...projectGroup.faculty };

  return isStudentLoading ? (
    <Skeleton variant='rect' height={500} animation='wave' />
  ) : (
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
                  <TableCell style={{ width: '30%' }}>Name: </TableCell>
                  <TableCell style={{ width: '70%' }}>
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
                    {techArray.map((data, index) => (
                      <p key={index}> {data} </p>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Team Leader: </TableCell>
                  <TableCell>
                    {Student.teamLeader ? (
                      <p>You are a Team Leader</p>
                    ) : (
                      <p>
                        Your TeamLeader is :{' '}
                        {getFormattedString(teamLeader.name)}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Team Members: </TableCell>
                  <TableCell>
                    <Typography paragraph>
                      Name : {getFormattedString(Stu01.name)} &nbsp; Email:{' '}
                      {getFormattedString(Stu01.email)}
                    </Typography>
                    <Typography paragraph>
                      Name : {getFormattedString(Stu02.name)} &nbsp; Email:{' '}
                      {getFormattedString(Stu02.email)}
                    </Typography>
                    <Typography paragraph>
                      Name : {getFormattedString(Stu03.name)} &nbsp; Email:{' '}
                      {getFormattedString(Stu03.email)}
                    </Typography>
                    <Typography paragraph>
                      Name : {getFormattedString(Stu04.name)} &nbsp; Email:{' '}
                      {getFormattedString(Stu04.email)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Faculty or Project Guide: </TableCell>
                  <TableCell>
                    {faculty.profile ? (
                      <img
                        src={faculty.profile}
                        alt='Faculty Profile Image'
                        height={110}
                      />
                    ) : (
                      <Skeleton
                        variant='rect'
                        height={110}
                        width={110}
                        animation='wave'
                      />
                    )}
                    <Typography paragraph>
                      Name : {getFormattedString(faculty.name)}
                    </Typography>
                    <Typography paragraph>
                      Email : {getFormattedString(faculty.email)}
                    </Typography>
                    <Typography paragraph>
                      Phone : {getFormattedString(faculty.phone)}
                    </Typography>
                    <Typography paragraph>
                      Designation : {getFormattedString(faculty.designation)}
                    </Typography>
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
