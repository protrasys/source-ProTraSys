import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
// import useStyles from './Style';

const FacultyControlPanel = () => {
  // const classes = useStyles();

  useEffect(() => {
    document.title = 'Control Panel';
  });

  return (
    <Box component='div'>
      <Typography variant='h1'>Faculy COntrol PAnel Page</Typography>
    </Box>
  );
};

export default FacultyControlPanel;
