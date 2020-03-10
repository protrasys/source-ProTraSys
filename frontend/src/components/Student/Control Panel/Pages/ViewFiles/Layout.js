import React, { useEffect } from 'react';
import { getFormattedString } from '../../../../../Helper';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import FileIcon from '../../../../../assets/File Icon.png';
import { Skeleton } from '@material-ui/lab';
import Moment from 'react-moment';
import { fetchProjectFiles } from '../../../../../store/actions';
import {
  selectOurProjectFiles,
  selectStudent
} from '../../../../../store/selectors';
import { useSelector } from 'react-redux';
import useStyles from './Style';
const ViewAllFiles = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const projectGroup = { ...StudentData.group };

  useEffect(() => {
    fetchProjectFiles(projectGroup._id);
  }, []);

  const ProjectFilesState = useSelector(selectOurProjectFiles);
  const ViewFiles = ProjectFilesState.data;

  // TODO: Style this View Files Component
  const RenderViewFiles = () =>
    ViewFiles &&
    ViewFiles.map((data, index) => (
      <TableContainer key={data._id} component={Paper}>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Sr. No. </TableCell>
              <TableCell>Uploaded File </TableCell>
              <TableCell>Description </TableCell>
              <TableCell>Uploaded Date </TableCell>
              <TableCell>Last Updated </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> {getFormattedString(index + 1)} </TableCell>
              <TableCell>
                <a
                  href={data.UploadedFile}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img src={FileIcon} alt={data.UploadedFile} height={110} />
                </a>
              </TableCell>
              <TableCell> {getFormattedString(data.Description)} </TableCell>
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
      <h1>Our Uploaded FIles</h1>
      {!ViewFiles ? (
        <Skeleton variant='rect' height={400} animation='wave' />
      ) : (
        RenderViewFiles()
      )}
    </div>
  );
};

export default ViewAllFiles;
