import React, { useEffect } from 'react';
import { getFormattedString } from '../../../../../Helper';
import { Box, Paper, Typography } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import Moment from 'react-moment';
import { fetchProjectFiles } from '../../../../../Store/actions';
import {
  selectOurProjectFiles,
  selectStudent,
} from '../../../../../Store/selectors';
import { useSelector } from 'react-redux';
import useStyles from './Style';
const ViewAllFiles = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const projectGroup = { ...StudentData.group };

  const id = projectGroup._id;

  useEffect(() => {
    fetchProjectFiles(id);
  }, [id]);

  const ProjectFilesState = useSelector(selectOurProjectFiles);
  const ViewFiles = ProjectFilesState.data;
  const Loading = ProjectFilesState.loading;
  const fileDescription = 'File Description here...';

  // TODO: Style this View Files Component
  const RenderViewFiles = () => (
    <Box className={classes.allFiles}>
      {!ViewFiles ? (
        <p>Opps! No files are uploaded here...</p>
      ) : (
        ViewFiles.map((data: any, index: any) => (
          <Box key={data._id}>
            <Box
              key={index}
              component={Paper}
              className={classes.uploadedFiles}
            >
              <Box component='div' className={classes.fileIcon}>
                <a
                  href={data.UploadedFile}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classes.fileIconColors}
                >
                  <Typography
                    style={{
                      position: 'relative',
                      top: '3.6rem',
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                    }}
                  >
                    {(index += 1)}
                    {}
                  </Typography>
                  <Folder
                    className={classes.icon}
                    style={
                      {
                        // color: `${abcd}`
                      }
                    }
                  />
                </a>
              </Box>
              <Box component='div'>
                {data.Description === '' ? (
                  <Typography
                    className={classes.fileDescription}
                    color='inherit'
                  >
                    {fileDescription}
                  </Typography>
                ) : (
                  <Typography
                    className={classes.fileDescription}
                    color='inherit'
                  >
                    {getFormattedString(data.Description)}
                  </Typography>
                )}
                <Typography className={classes.fileUploadDate}>
                  Uploaded at&nbsp;
                  <span>
                    <Moment format='DD/MM/YYYY'>
                      {getFormattedString(data.createdAt)}
                    </Moment>
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );

  return (
    <div>
      <h1>Our Uploaded Files</h1>
      {Loading ? (
        <Skeleton variant='rect' height={400} animation='wave' />
      ) : (
        RenderViewFiles()
      )}
    </div>
  );
};

export default ViewAllFiles;
