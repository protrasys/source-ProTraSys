import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography } from '@material-ui/core';
import useStyles from './Style';
import { CloudUpload } from '@material-ui/icons';

const FileUpload = () => {
    const classes = useStyles();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    const files = acceptedFiles.map(file => (

        <TableContainer key={file.path}>
            <TableHead>
                <TableRow>
                    <TableCell align="center">File Path</TableCell>
                    <TableCell align="center">File Size</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="center">{file.path}</TableCell>
                    <TableCell align="center">{file.size} bytes</TableCell>
                </TableRow>
            </TableBody>
        </TableContainer>
      
    ));

    return (
        <Box variant="div" style={{padding:"1rem"}}>
            <Box variant="div" {...getRootProps({})} className={classes.dropzone}>
                <input {...getInputProps()} />
                <CloudUpload style={{fontSize: '5rem'}} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Box>
            <br/>
            <aside>
                <Table align="center">{files}</Table>
            </aside>
        </Box>
    );
}
export  default FileUpload;
