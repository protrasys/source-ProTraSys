import React from 'react';
import useStyles from './Style';
import { Box, Typography } from '@material-ui/core';
import Appbar from '../../Partials/AppBar';

const PageNotFoundImg = require('../../../../assets/undraw_page_not_found_su7k.svg');
const PageNotFound = () => {
  const classes = useStyles();
  return (
    <Box component='div'>
      <Appbar />
      <Box component='div' className={classes.center}>
        <img
          src={PageNotFoundImg}
          alt='404 Error Page Not Found'
          className={classes.img}
        />
        <Typography variant='h2'>Page Not Found</Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;
