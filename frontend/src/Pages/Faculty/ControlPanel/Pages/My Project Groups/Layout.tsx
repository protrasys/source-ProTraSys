import React, { useEffect } from 'react';
import useStyles from './Style';
import { fetchMineProjectGroups } from '../../../../../Store/actions';
import { useSelector } from 'react-redux';
import { selectMineProjectGroups } from '../../../../../Store/selectors';
import { Skeleton } from '@material-ui/lab';
import Moment from 'react-moment';
import { getFormattedString } from '../../../../../Helper';
import { Box, Typography, Paper } from '@material-ui/core';
const MineProjectGroups = () => {
  const classes = useStyles();

  useEffect(() => {
    fetchMineProjectGroups();
  }, []);

  // Select state from Redux
  const MineProjectGroupsState = useSelector(selectMineProjectGroups);
  const isLoading = MineProjectGroupsState.loading;
  const GroupData = MineProjectGroupsState.data;
  const length = GroupData && GroupData.length;

  const RenderMineProjectGroups = () => {
    return (
      <Box component='div'>
        {GroupData &&
          GroupData.map((data: any, index: any) => (
            <Box component='div' key={index}>
              <Box component={Paper} className={classes.paper}>
                <Typography className={classes.heading}>
                  Project Details
                  <span className={classes.group}>Group No.{index + 1}</span>
                </Typography>
                <Box component='div' className={classes.projectDetails}>
                  <Typography className={classes.head}>Name</Typography>
                  <Typography className={classes.detail}>
                    {getFormattedString(data.projectName)}
                  </Typography>
                  <Typography className={classes.head}>Technology</Typography>
                  <Typography>
                    {data.technology.map((value: any) => (
                      <Typography className={classes.detail}>
                        {getFormattedString(value)}
                      </Typography>
                    ))}
                  </Typography>
                  <Typography className={classes.head}>Definition</Typography>
                  <Typography className={classes.detail}>
                    {getFormattedString(data.definition)}
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
                    <Typography className={classes.head}>Name</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu01.name)}
                    </Typography>
                    <Typography className={classes.head}>Semester</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu01.sem)}
                    </Typography>
                    <Typography className={classes.head}>
                      Enrollment Id
                    </Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu01.enrollmentId)}
                    </Typography>
                    <Typography className={classes.head}>Email</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu01.email)}
                    </Typography>
                    <Typography className={classes.head}>Phone</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu01.phone)}
                    </Typography>
                  </Box>
                  <Box component='div' className={classes.student}>
                    <Typography className={classes.individualStudentDetails}>
                      2nd Student Details
                    </Typography>
                    <Typography className={classes.head}>Name</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu02.name)}
                    </Typography>
                    <Typography className={classes.head}>Semester</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu02.sem)}
                    </Typography>
                    <Typography className={classes.head}>
                      Enrollment Id
                    </Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu02.enrollmentId)}
                    </Typography>
                    <Typography className={classes.head}>Email</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu02.email)}
                    </Typography>
                    <Typography className={classes.head}>Phone</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu02.phone)}
                    </Typography>
                  </Box>
                  <Box component='div' className={classes.student}>
                    <Typography className={classes.individualStudentDetails}>
                      3rd Student Details
                    </Typography>
                    <Typography className={classes.head}>Name</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu03.name)}
                    </Typography>
                    <Typography className={classes.head}>Semester</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu03.sem)}
                    </Typography>
                    <Typography className={classes.head}>
                      Enrollment Id
                    </Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu03.enrollmentId)}
                    </Typography>
                    <Typography className={classes.head}>Email</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu03.email)}
                    </Typography>
                    <Typography className={classes.head}>Phone</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu03.phone)}
                    </Typography>
                  </Box>
                  <Box component='div' className={classes.student}>
                    <Typography className={classes.individualStudentDetails}>
                      4th Student Details
                    </Typography>
                    <Typography className={classes.head}>Name</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu04.name)}
                    </Typography>
                    <Typography className={classes.head}>Semester</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu04.sem)}
                    </Typography>
                    <Typography className={classes.head}>
                      Enrollment Id
                    </Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu04.enrollmentId)}
                    </Typography>
                    <Typography className={classes.head}>Email</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu04.email)}
                    </Typography>
                    <Typography className={classes.head}>Phone</Typography>
                    <Typography className={classes.detail}>
                      {getFormattedString(data.stu04.phone)}
                    </Typography>
                  </Box>
                </Box>
                <Typography className={classes.heading}>
                  Faculty Details
                </Typography>
                <Box component='div' className={classes.faculty}>
                  <Typography className={classes.head}>Name</Typography>
                  <Typography className={classes.detail}>
                    {getFormattedString(data.faculty.name)}
                  </Typography>
                  <Typography className={classes.head}>Phone</Typography>
                  <Typography className={classes.detail}>
                    {getFormattedString(data.faculty.phone)}
                  </Typography>
                  <Typography className={classes.head}>Skills</Typography>
                  {getFormattedString(
                    data.technology.map((value: any, index: any) => (
                      <Typography key={index} className={classes.detail}>
                        {value}
                      </Typography>
                    ))
                  )}
                  <Typography className={classes.head}>Designation</Typography>
                  <Typography className={classes.detail}>
                    {getFormattedString(data.faculty.designation)}
                  </Typography>
                </Box>
                <Typography className={classes.heading}>
                  Other Details
                </Typography>
                <Box component='div' className={classes.other}>
                  <Typography className={classes.head}>
                    TeamLeader Name
                  </Typography>
                  <Typography className={classes.detail}>
                    {getFormattedString(data.teamLeader.name)}
                  </Typography>
                  <Typography className={classes.head}>
                    TeamLeader Sem
                  </Typography>
                  <Typography className={classes.detail}>
                    {getFormattedString(data.teamLeader.sem)}
                  </Typography>
                  <Typography className={classes.head}>Date</Typography>
                  <Typography className={classes.detail}>
                    <Moment format='DD/MMM/YYYY'>
                      {getFormattedString(data.createdAt)}
                    </Moment>
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        {length === 0 && <Typography paragraph>No Group Found here</Typography>}
      </Box>
    );
  };

  return (
    <div>
      <h1>Mine Project Group</h1>
      {isLoading ? (
        <Skeleton variant='rect' animation='wave' height={500} />
      ) : (
        RenderMineProjectGroups()
      )}
    </div>
  );
};

export default MineProjectGroups;
