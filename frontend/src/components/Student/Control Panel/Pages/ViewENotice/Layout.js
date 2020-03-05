import React, { useEffect } from 'react';
import { getFormattedString } from '../../../../../Helper';
import { fetchENoticeListing } from '../../../../../store/actions';
import useStyles from './Style';
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
import Moment from 'react-moment';

// Import Redux Dependencies
import { useSelector } from 'react-redux';
import { selectENotices } from '../../../../../store/selectors';

const ViewENotice = () => {
  const classes = useStyles();

  useEffect(() => {
    fetchENoticeListing();
  }, []);

  // Redux State Selectors
  const ENoticesResponse = useSelector(selectENotices);
  const ENotices = ENoticesResponse.data;

  // TODO: Style this Notice Component
  const RenderENotices = () =>
    ENotices &&
    ENotices.map((data) => (
      <TableContainer key={data._id} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Faculty </TableCell>
              <TableCell>Notice Title </TableCell>
              <TableCell>Description </TableCell>
              <TableCell>Posted At </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> {getFormattedString(data.faculty.name)} </TableCell>
              <TableCell> {getFormattedString(data.title)} </TableCell>
              <TableCell>{getFormattedString(data.description)}</TableCell>
              <TableCell>
                <Moment format='DD/MM/YYYY'>
                  {getFormattedString(data.createdAt)}
                </Moment>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ));

  return (
    <div>
      <h1>View E Notice</h1>
      {!ENotices ? <h2>Loading...</h2> : RenderENotices()}
    </div>
  );
};

export default ViewENotice;
