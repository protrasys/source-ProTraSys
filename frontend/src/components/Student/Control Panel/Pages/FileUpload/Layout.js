import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@material-ui/core';
import useStyles from './Style';
import { CloudUpload, CloudDownload } from '@material-ui/icons';

// File Upload Dependencies
import FirebaseConfig from '../../../../../Config/firebase-config';
import Firebase from 'firebase';
import FirebaseFileUploader from 'react-firebase-file-uploader';

Firebase.initializeApp(FirebaseConfig);

const FileUpload = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    isUploading: false,
    progress: 0,
    fileURL: ''
  });

  const handleUploadStart = () => {
    setState((prevState) => {
      return { ...prevState, isUploading: true, progress: 0 };
    });
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

  const { acceptedFiles, getRootProps } = useDropzone();

  // This Function converts bytes into human readable size unit
  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  const files = acceptedFiles.map((file) => (
    <TableContainer key={file.path} align='center'>
      <TableHead>
        <TableRow>
          <TableCell align='center'>File Path</TableCell>
          <TableCell align='center'>File Size</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align='center'>{file.path}</TableCell>
          <TableCell align='center'>{bytesToSize(file.size)}</TableCell>
        </TableRow>
      </TableBody>
    </TableContainer>
  ));

  return (
    <Box variant='div' style={{ padding: '1rem' }}>
      <Box variant='div' {...getRootProps({})} className={classes.dropzone}>
        {state.fileURL ? (
          <CloudDownload style={{ fontSize: '5rem' }} />
        ) : (
          <CloudUpload style={{ fontSize: '5rem' }} />
        )}
        {state.isUploading && <p>progress: {state.progress}</p>}
        {state.fileURL && (
          <a target='_blank' href={state.fileURL}>
            <button>Download Me</button>
          </a>
        )}
        <FirebaseFileUploader
          accept='*'
          randomizeFilename
          storageRef={Firebase.storage().ref('files')}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
        />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Box>
      <br />
      <aside component='div'>
        <Table>{files}</Table>
      </aside>
    </Box>
  );
};
export default FileUpload;
