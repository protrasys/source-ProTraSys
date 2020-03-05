import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Grow } from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import useStyles from './Style';
import { CloudUpload } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const FileUpload = () => {
    const classes = useStyles();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    const files = acceptedFiles.map(file => (

        <Alert key={file.name} severity="success">
            {file.name} - {file.size} bytes
        </Alert>        
      
    ));

    return (
        <Box variant="div" style={{padding:"1rem"}}>
            <Box variant="div" {...getRootProps({})} className={classes.dropzone}>
                <input {...getInputProps()} />
                <CloudUpload className={classes.uploadIcon} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Box>
            <br/>
            <aside>
                {files}
            </aside>
        </Box>
    );
}
export default FileUpload;
