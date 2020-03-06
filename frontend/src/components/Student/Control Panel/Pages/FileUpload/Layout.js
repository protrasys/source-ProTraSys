import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  LinearProgress,
  Typography,
  Snackbar,
  Slide,
  IconButton
} from '@material-ui/core';
import useStyles from './Style';
import { CloudUpload, CloudDownload, Close } from '@material-ui/icons';

// File Upload Dependencies
import FirebaseConfig from '../../../../../Config/firebase-config';
import Firebase from 'firebase';
import FirebaseFileUploader from 'react-firebase-file-uploader';

// Redux Integration
import { FileUploadService } from '../../../../../Services';
import { selectStudent } from '../../../../../store/selectors';
import { useSelector } from 'react-redux';

Firebase.initializeApp(FirebaseConfig);

const FileUpload = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const projectGroup = { ...StudentData.group };

  const [state, setState] = useState({
    isUploading: false,
    progress: 0,
    fileURL: '',
    fileName: '',
    Description: ''
  });

  const [open, setOpen] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [AlertMessage, setAlertMessage] = useState('');

  const handleUploadStart = () => {
    setState((prevState) => {
      return { ...prevState, isUploading: true, progress: 0 };
    });
  };

  const handleOnChange = (e) => {
    e.persist();
    setState((prevState) => {
      return { ...prevState, Description: e.target.value };
    });
  };

  const handleOnUploadButton = async () => {
    try {
      setUploading(true);
      const FUpload = await FileUploadService.uploadFile(
        state.fileURL,
        state.Description,
        projectGroup._id
      );
      setUploading(false);
      setOpen(true);
      setAlertMessage(`${FUpload.msg}`);
    } catch (err) {
      console.log('err', err);
      setUploading(false);
    } finally {
      setUploading(false);
      setState({
        isUploading: false,
        progress: 0,
        fileURL: '',
        fileName: '',
        Description: ''
      });
    }
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const handleProgress = (currentProgressValue) => {
    setState((prevState) => {
      return { ...prevState, progress: currentProgressValue };
    });
  };

  const handleUploadError = (err) => {
    setState((prevState) => {
      return { ...prevState, isUploading: false };
    });
    console.log('FILE UPLOAD ERROR', err);
  };

  const handleUploadSuccess = (filename) => {
    console.log('FILE UPLOAD SUCCESS', filename);
    setState((prevState) => {
      return { ...prevState, fileName: filename };
    });
    Firebase.storage()
      .ref('files')
      .child(filename)
      .getDownloadURL()
      .then((url) =>
        setState((prevState) => {
          return {
            ...prevState,
            fileURL: url,
            progress: 100,
            isUploading: false
          };
        })
      );
  };

  // URL TO SEND FILE uploadProjectFiles/:projectId
  // { UploadedFile, Description, projectId } This are the fields to send to the FileUploadService

  return (
    <Box variant='div' style={{ padding: '1rem' }}>
      <Snackbar
        open={open}
        transitionDuration={500}
        key={Math.random()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        ContentProps={{
          classes: {
            root: classes.success
          }
        }}
        TransitionComponent={Slide}
        message={AlertMessage}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleSnackBarClose}
            >
              <Close fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <Box variant='div' className={classes.dropzone}>
        {state.fileURL ? (
          <CloudDownload style={{ fontSize: '5rem' }} />
        ) : (
          <CloudUpload style={{ fontSize: '5rem' }} />
        )}
        {state.isUploading && (
          <div>
            <LinearProgress
              variant='determinate'
              color='primary'
              value={state.progress}
            />
            <p>progress: {state.progress}</p>
          </div>
        )}
        {state.fileURL ? (
          <Box component='div' className={classes.uploadForm}>
            <Typography variant='h6'> Your File:- {state.fileName} </Typography>
            <TextField
              fullWidth
              onChange={handleOnChange}
              multiline={true}
              label='Description'
              variant='outlined'
            />
            <a
              href={state.fileURL}
              className={classes.List}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button variant='contained' color='secondary'>
                Download File
              </Button>
            </a>
            <Button
              variant='contained'
              color='primary'
              onClick={handleOnUploadButton}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>
        ) : (
          <Box component='div'>
            <FirebaseFileUploader
              accept='*'
              storageRef={Firebase.storage().ref('files')}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress={handleProgress}
            />
            <p>Click to select files</p>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default FileUpload;
