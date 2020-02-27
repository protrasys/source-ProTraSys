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

const StudnetProfile = (props) => {
  const classes = useStyles();
  const { data } = props;
  return (
    <div>
      <Typography variant='h3'>
        Welcome {getFormattedString(data.name)}
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
              <TableCell> {getFormattedString(data.name)} </TableCell>
              <TableCell> {getFormattedString(data.email)} </TableCell>
              <TableCell> {getFormattedString(data.enrollmentId)} </TableCell>
              <TableCell> {getFormattedString(data.phone)} </TableCell>
              <TableCell> {getFormattedString(data.sem)} </TableCell>
              <TableCell>
                <Moment format='YYYY/MM/DD'>
                  {getFormattedString(data.createdAt)}
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
