import React, { useEffect } from 'react';
import useStyles from './Style';
import { getFormattedString } from '../../../../../Helper';
import { useSelector } from 'react-redux';
import { fetchAllProjectGroups } from '../../../../../store/actions';
import { selectAllProjectGroups } from '../../../../../store/selectors';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

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
        AllGroups.map((data, index) => (
          <Box component='div' key={index} className={classes.root}>
            <h4> Project Name: {data.projectName} </h4>
            <h6> Project Definition: {data.definition} </h6>
            <h4> 1st Student Details </h4>
            <h6> Name : {data.stu01.name} </h6>
            <h6> Semester : {data.stu01.sem} </h6>
            <h6> Enrollment Id : {data.stu01.enrollmentId} </h6>
            <h4> 2nd Student Details </h4>
            <h6> Name : {data.stu02.name} </h6>
            <h6> Semester : {data.stu02.sem} </h6>
            <h6> Enrollment Id : {data.stu02.enrollmentId} </h6>
            <h4> 3rd Student Details </h4>
            <h6> Name : {data.stu03.name} </h6>
            <h6> Semester : {data.stu03.sem} </h6>
            <h6> Enrollment Id : {data.stu03.enrollmentId} </h6>
            <h4> 4th Student Details </h4>
            <h6> Name : {data.stu04.name} </h6>
            <h6> Semester : {data.stu04.sem} </h6>
            <h6> Enrollment Id : {data.stu04.enrollmentId} </h6>
            <h4> Faculty Details </h4>
            <h6> Name : {data.faculty.name} </h6>
            <h6> Designation : {data.faculty.designation} </h6>
            <h6> Enrollment Id : {data.stu04.enrollmentId} </h6>
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
