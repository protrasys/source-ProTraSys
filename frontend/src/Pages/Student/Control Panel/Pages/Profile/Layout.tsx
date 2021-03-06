import React from 'react';
import { Paper, Typography, Box, Divider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import useStyles from './Style';
import Moment from 'react-moment';
import { getFormattedString } from '../../../../../Helper';

// Redux Integration Dependencies
import { selectStudent } from '../../../../../Store/selectors';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);

  const isStudentLoading = StudentDetails.loading;

  const StudentData = { ...StudentDetails.data };
  const Student = { ...StudentData.student };
  const projectGroup = { ...StudentData.group };
  const TechnologiesUsedInProject = { ...projectGroup.technology };

  // It Saves value captured from Object
  const techArray: any = [];

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
    <Box component='div'>
      <Paper className={classes.root}>
        <Typography variant='h3' className={classes.userName}>
          Welcome {getFormattedString(Student.name)}
        </Typography>
        <Divider style={{ marginBottom: '1rem' }} />
        <Box component='div'>
          <Typography className={classes.heading}>Student Details</Typography>
          <Box component='div' className={classes.allDetail}>
            <Box className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Full Name
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                {getFormattedString(Student.name)}
              </Typography>
            </Box>
            <Box className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Email
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                {getFormattedString(Student.email)}
              </Typography>
            </Box>
            <Box className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                enrollment Id
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                {getFormattedString(Student.enrollmentId)}
              </Typography>
            </Box>
            <Box className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Phone
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                {getFormattedString(Student.phone)}
              </Typography>
            </Box>
            <Box className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Sem
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                {getFormattedString(Student.sem)}
              </Typography>
            </Box>
            <Box className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Registered Date
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                <Moment format='DD/MM/YYYY'>
                  {getFormattedString(Student.createdAt)}
                </Moment>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box component='div'>
          <Typography variant='body1' className={classes.heading}>
            Project Group Details
          </Typography>
          <Box component='div'>
            <Box component='div' className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Name
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                {getFormattedString(projectGroup.projectName)}
              </Typography>
            </Box>
            <Box component='div' className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Definition
              </Typography>
              <Typography variant='body1' className={classes.detail}>
                {getFormattedString(projectGroup.definition)}
              </Typography>
            </Box>
            <Box component='div' className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Technologies
              </Typography>

              {techArray.map((data: any, index: any) => (
                <Typography
                  variant='body1'
                  key={index}
                  className={classes.detail}
                >
                  {data}
                </Typography>
              ))}
            </Box>
            <Box component='div' className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                TeamLeader
              </Typography>
              <Box component='div' className={classes.detail}>
                {Student.teamLeader ? (
                  <Typography variant='body1'>You are a Team Leader</Typography>
                ) : (
                  <Typography variant='body1'>
                    Your TeamLeader is : {getFormattedString(teamLeader.name)}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box component='div' className={classes.allDetails}>
              <Typography variant='body1' className={classes.head}>
                Team Members
              </Typography>
              <Box component='div' className={classes.allDetail}>
                <Box component='div' className={classes.student}>
                  <Typography
                    variant='body1'
                    className={classes.individualStudentDetails}
                  >
                    1st Student Details
                  </Typography>
                  <Box component='div' className={classes.allDetails}>
                    <Typography variant='body1' className={classes.head}>
                      Name
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu01.name)}
                    </Typography>
                    <Typography variant='body1' className={classes.head}>
                      Email
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu01.email)}
                    </Typography>
                  </Box>
                </Box>
                <Box component='div' className={classes.student}>
                  <Typography
                    variant='body1'
                    className={classes.individualStudentDetails}
                  >
                    2nd Student Details
                  </Typography>
                  <Box component='div' className={classes.allDetails}>
                    <Typography variant='body1' className={classes.head}>
                      Name
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu02.name)}
                    </Typography>
                    <Typography variant='body1' className={classes.head}>
                      Email
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu02.email)}
                    </Typography>
                  </Box>
                </Box>
                <Box component='div' className={classes.student}>
                  <Typography
                    variant='body1'
                    className={classes.individualStudentDetails}
                  >
                    3rd Student Details
                  </Typography>
                  <Box component='div' className={classes.allDetails}>
                    <Typography variant='body1' className={classes.head}>
                      Name
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu03.name)}
                    </Typography>
                    <Typography variant='body1' className={classes.head}>
                      Email
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu03.email)}
                    </Typography>
                  </Box>
                </Box>
                <Box component='div' className={classes.student}>
                  <Typography
                    variant='body1'
                    className={classes.individualStudentDetails}
                  >
                    4th Student Details
                  </Typography>
                  <Box component='div' className={classes.allDetails}>
                    <Typography variant='body1' className={classes.head}>
                      Name
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu04.name)}
                    </Typography>
                    <Typography variant='body1' className={classes.head}>
                      Email
                    </Typography>
                    <Typography
                      variant='body1'
                      className={classes.detail}
                      style={{ marginBottom: '.6rem' }}
                    >
                      {getFormattedString(Stu04.email)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box component='div'>
              <Typography variant='body1' className={classes.heading}>
                Faculty or Project Guide
              </Typography>
              <Box component='div' className={classes.allDetail}>
                <Box component='div' className={classes.allDetails}>
                  {faculty.profile ? (
                    <img
                      src={faculty.profile}
                      alt='Faculty Profile'
                      className={classes.img}
                    />
                  ) : (
                    <Skeleton
                      variant='rect'
                      height={110}
                      width={110}
                      animation='wave'
                    />
                  )}
                </Box>
                <Box component='div' className={classes.allDetails}>
                  <Typography variant='body1' className={classes.head}>
                    Name
                  </Typography>
                  <Typography variant='h3' className={classes.detail}>
                    {getFormattedString(faculty.name)}
                  </Typography>
                </Box>
                <Box component='div' className={classes.allDetails}>
                  <Typography variant='body1' className={classes.head}>
                    Email
                  </Typography>
                  <Typography variant='h3' className={classes.detail}>
                    {getFormattedString(faculty.email)}
                  </Typography>
                </Box>
                <Box component='div' className={classes.allDetails}>
                  <Typography variant='body1' className={classes.head}>
                    Phone
                  </Typography>
                  <Typography variant='h3' className={classes.detail}>
                    {getFormattedString(faculty.phone)}
                  </Typography>
                </Box>
                <Box component='div' className={classes.allDetails}>
                  <Typography variant='body1' className={classes.head}>
                    Designation
                  </Typography>
                  <Typography variant='h3' className={classes.detail}>
                    {getFormattedString(faculty.designation)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider style={{ marginBottom: '1rem' }} />
        <Box component='div' style={{ textAlign: 'right' }}>
          <Typography variant='body1' className={classes.head}>
            Group created at :&nbsp;
            <Moment format='DD/MM/YYYY' className={classes.detail}>
              {getFormattedString(projectGroup.createdAt)}
            </Moment>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentProfile;
