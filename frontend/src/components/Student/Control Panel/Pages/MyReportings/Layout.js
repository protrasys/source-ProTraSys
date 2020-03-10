import React, { useEffect } from 'react';
import { getFormattedString } from '../../../../../Helper';
import { fetchEReportListing } from '../../../../../store/actions';
import useStyles from './Style';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Moment from 'react-moment';

// Import Redux Dependencies
import { useSelector } from 'react-redux';
import { selectStudent, selectEReports } from '../../../../../store/selectors';

const MyReportings = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const projectGroup = { ...StudentData.group };
  const EReportState = useSelector(selectEReports);
  const EReports = EReportState.data;
  useEffect(() => {
    fetchEReportListing(projectGroup._id);
  }, []);

  // TODO: Style this Report Component
  const RenderEReports = () =>
    EReports &&
    EReports.map((data) => (
      <TableContainer key={data._id} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Discussion </TableCell>
              <TableCell>Feedback </TableCell>
              <TableCell>Reporting Date </TableCell>
              <TableCell>Last Updated </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> {getFormattedString(data.discussion)} </TableCell>
              <TableCell> {getFormattedString(data.feedback)} </TableCell>
              <TableCell>
                <Moment format='DD/MM/YYYY'>
                  {getFormattedString(data.createdAt)}
                </Moment>
              </TableCell>
              <TableCell>
                <Moment format='DD/MM/YYYY'>
                  {getFormattedString(data.updatedAt)}
                </Moment>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ));

  return (
    <div>
      <h1>My All Reportings</h1>
      {!EReports ? (
        <Skeleton variant='rect' height={400} animation='wave' />
      ) : (
        RenderEReports()
      )}
    </div>
  );
};

export default MyReportings;
