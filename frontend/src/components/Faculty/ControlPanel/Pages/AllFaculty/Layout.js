import React, { useEffect } from 'react';
import useStyles from './Style';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@material-ui/core';
import { getFormattedString } from '../../../../../Helper';
import { selectAllFaculties } from '../../../../../store/selectors';
import { GetAllFaculties } from '../../../../../store/actions';
import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';

function AllFaculty() {
  const classes = useStyles();

  useEffect(() => {
    GetAllFaculties();
  }, []);

  const AllFacultyState = useSelector(selectAllFaculties);
  const isAllFacultyLoading = AllFacultyState.loading;
  const AllFaculty = AllFacultyState.data;

  const RenderAllFaculties = () => {
    return (
      <Box component='div'>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Sr. No. </TableCell>
                <TableCell>Faculty Name </TableCell>
                <TableCell>Profile </TableCell>
                <TableCell>Enrollment ID </TableCell>
                <TableCell>Skills </TableCell>
                <TableCell>Email </TableCell>
                <TableCell>Phone </TableCell>
                <TableCell>Designation </TableCell>
                <TableCell>Joining Date </TableCell>
                <TableCell>Registered At </TableCell>
                <TableCell>Last Updated At </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AllFaculty &&
                AllFaculty.map((data, index) => (
                  <TableRow>
                    <TableCell> {getFormattedString(index + 1)} </TableCell>
                    <TableCell> {getFormattedString(data.name)} </TableCell>
                    <TableCell>
                      <img src={data.profile} alt={data.name} height={50} />
                    </TableCell>
                    <TableCell>
                      {getFormattedString(data.enrollmentId)}
                    </TableCell>
                    <TableCell>{getFormattedString(data.skills)}</TableCell>
                    <TableCell>{getFormattedString(data.email)}</TableCell>
                    <TableCell>{getFormattedString(data.phone)}</TableCell>
                    <TableCell>
                      {getFormattedString(data.designation)}
                    </TableCell>
                    <TableCell>{getFormattedString(data.date.from)}</TableCell>
                    <TableCell>{getFormattedString(data.createdAt)}</TableCell>
                    <TableCell>{getFormattedString(data.updatedAt)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  return isAllFacultyLoading ? (
    <Skeleton variant='rect' height={500} animation='wave' />
  ) : (
    RenderAllFaculties()
  );
}

export default AllFaculty;
