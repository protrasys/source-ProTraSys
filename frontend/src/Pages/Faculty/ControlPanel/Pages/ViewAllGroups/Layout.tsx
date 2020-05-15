import React, { useEffect } from 'react';
import useStyles from './Style';
import { useSelector } from 'react-redux';
import { fetchAllProjectGroups } from '../../../../../Store/actions';
import { selectAllProjectGroups } from '../../../../../Store/selectors';
import { Skeleton } from '@material-ui/lab';
import { Box, Typography, Paper } from '@material-ui/core';

const ViewAllProjectGroups = () => {
  const classes = useStyles();

  // Retrieving All Project Groups from Database
  useEffect(() => {
    fetchAllProjectGroups();
  }, []);

  const AllGroupState = useSelector(selectAllProjectGroups);
  const isAllGroupRendering = AllGroupState.loading;
  const AllGroups = AllGroupState.data;

  const RenderAllGroups = () => {
    return isAllGroupRendering ? (
      <Skeleton variant='rect' animation='wave' height={500} />
    ) : (
      AllGroups &&
        AllGroups.map((data: any, index: any) => (
          <Box component='div' key={index} className={classes.root}>
            <Box component={Paper} className={classes.paper}>
              <Typography className={classes.heading}>
                Project Details
                <span className={classes.group}>Group No.{index + 1}</span>
              </Typography>
              <Box component='div' className={classes.projectDetails}>
                <Typography className={classes.head}>Name</Typography>
                <Typography className={classes.detail}>
                  {data.projectName}
                </Typography>
                <Typography className={classes.head}>Technology</Typography>
                <Typography>
                  {data.technology.map((value: any) => (
                    <Typography className={classes.detail}>{value}</Typography>
                  ))}
                </Typography>
                <Typography className={classes.head}>Definition</Typography>
                <Typography className={classes.detail}>
                  {data.definition}
                </Typography>
              </Box>
              <Typography className={classes.heading}>
                Student Details
              </Typography>
              <Box component='div' className={classes.allStudent}>
                <Box component='div' className={classes.student}>
                  <Typography className={classes.individualStudentDetails}>
                    1st Student Details
                  </Typography>

                  <Typography className={classes.head}>
                    Name : {data.stu01.name}
                  </Typography>

                  <Typography className={classes.head}>
                    Semester : {data.stu01.sem}
                  </Typography>

                  <Typography className={classes.head}>
                    Enrollment Id : {data.stu01.enrollmentId}
                  </Typography>
                </Box>
                <Box component='div' className={classes.student}>
                  <Typography className={classes.individualStudentDetails}>
                    2nd Student Details
                  </Typography>
                  <Typography className={classes.head}>
                    Name : {data.stu02.name}
                  </Typography>
                  <Typography className={classes.head}>
                    Semester : {data.stu02.sem}
                  </Typography>

                  <Typography className={classes.head}>
                    Enrollment Id : {data.stu02.enrollmentId}
                  </Typography>
                </Box>
                <Box component='div' className={classes.student}>
                  <Typography className={classes.individualStudentDetails}>
                    3rd Student Details
                  </Typography>
                  <Typography className={classes.head}>
                    Name : {data.stu03.name}
                  </Typography>

                  <Typography className={classes.head}>
                    Semester : {data.stu03.sem}
                  </Typography>

                  <Typography className={classes.head}>
                    Enrollment Id : {data.stu03.enrollmentId}
                  </Typography>
                </Box>
                <Box component='div' className={classes.student}>
                  <Typography className={classes.individualStudentDetails}>
                    4th Student Details
                  </Typography>
                  <Typography className={classes.head}>
                    Name : {data.stu04.name}
                  </Typography>

                  <Typography className={classes.head}>
                    Semester : {data.stu04.sem}
                  </Typography>

                  <Typography className={classes.head}>
                    Enrollment Id : {data.stu04.enrollmentId}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))
    );
  };

  return (
    <div>
      <h1>View All Project Group</h1>
      {RenderAllGroups()}
    </div>
  );
};

export default ViewAllProjectGroups;
