import React, { useState } from 'react';
import {
  Box,
  Snackbar,
  IconButton,
  TextField,
  Button,
} from '@material-ui/core';
import useStyles from './Style';
import Firebase from 'firebase';
import firebaseConfig from 'Config/firebase-config';
import { Close } from '@material-ui/icons';
import { FileUploadService } from 'Services';
import { selectStudent } from 'Store/selectors';
import { useSelector } from 'react-redux';

// Image Imports
const DefaultImage = require('assets/undraw_folder_files_nweq.png');
const NotebookIcon = require('assets/sync_files.png');
const LoadingGif = require('assets/load.gif');

// Initialize the firebase app
Firebase.initializeApp(firebaseConfig);

const FileUpload = () => {
  const classes = useStyles();
  const [uploading, setUploading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [fileURL, setFileURL] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [AlertMessage, setAlertMessage] = useState<any>();

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const projectGroup = { ...StudentData.group };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const handleFileUpload = async (e: any) => {
    setUploading(true);
    const file = e.target.files[0];
    const storageRef = Firebase.storage().ref('uploadedFiles/' + file.name);
    await storageRef.put(file).then((data) => {
      setFileURL(
        `https://firebasestorage.googleapis.com/v0/b/protrasys.appspot.com/o/uploadedFiles%2F${file.name}?alt=media&token=8fda1a15-cc5e-45a3-8673-0cfa983e7183`
      );
      setUploading(false);
    });
  };

  const handleOnChange = (e: any) => {
    e.persist();
    setDescription(e.target.value);
  };

  const handleOnUploadButton = async (e: any) => {
    e.preventDefault();
    try {
      setSending(true);
      const FUpload = await FileUploadService.uploadFile(
        fileURL,
        description,
        projectGroup._id
      );
      setSending(false);
      setOpen(true);
      setAlertMessage(`${FUpload.msg}`);
    } catch (err) {
      console.log('err', err);
      setSending(false);
    } finally {
      setSending(false);
      setUploading(false);
      setDescription('');
      setFileURL('');
    }
  };

  return (
    <Box className={classes.root}>
      <Snackbar
        open={open}
        transitionDuration={500}
        key={Math.random()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        ContentProps={{
          classes: {
            root: classes.success,
          },
        }}
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
      {!fileURL && (
        <React.Fragment>
          {uploading ? (
            <img
              src={LoadingGif}
              alt='Upload Your File Below'
              className={classes.defaultImage}
            />
          ) : (
            <React.Fragment>
              <img
                src={DefaultImage}
                alt='Uploading in progress'
                className={classes.defaultImage}
              />
              <input
                type='file'
                name='fileButton'
                onChange={handleFileUpload}
              ></input>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {fileURL && (
        <React.Fragment>
          <form onSubmit={handleOnUploadButton} className={classes.formDiv}>
            <img
              src={NotebookIcon}
              alt='Write Description'
              className={classes.formImage}
            />
            <TextField
              onChange={handleOnChange}
              label='File Description'
              variant='outlined'
              required
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={sending}
            >
              {sending ? 'Uploading...' : 'Upload'}
            </Button>
          </form>
        </React.Fragment>
      )}
    </Box>
  );
};

export default FileUpload;
