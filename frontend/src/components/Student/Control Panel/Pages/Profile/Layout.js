import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core';
import useStyles from './Style';
import Moment from 'react-moment';
import { getFormattedString } from '../../../../../Helper';
import { selectStudent } from '../../../../../store/selectors';
import { useSelector } from 'react-redux';

const StudnetProfile = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);
  const Student = { ...StudentDetails.data };

  return (
    <div>
      <Typography variant='h3'>
        Welcome {getFormattedString(Student.name)}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Full Name </TableCell>
              <TableCell>E-Mail </TableCell>
              <TableCell>Enrollment Id </TableCell>
              <TableCell>Phone </TableCell>
              <TableCell>Sem </TableCell>
              <TableCell>Registered Date </TableCell>
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
    </div>
  );
};

export default StudnetProfile;
