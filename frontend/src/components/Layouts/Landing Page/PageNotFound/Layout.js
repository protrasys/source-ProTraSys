import React from 'react';
import PageNotFoundImg from '../../../../assets/undraw_page_not_found_su7k.svg';
import useStyles from './Style';
import { Box, Typography } from '@material-ui/core';
import Appbar from '../../Partials/AppBar';

const PageNotFound = () => {
  const classes = useStyles();
  return (
    <Box component='div'>
      <Appbar />
      <Box variant='div' className={classes.center}>
        <img src={PageNotFoundImg} alt='' className={classes.img} />
        <Typography variant='h2'>Page Not Found</Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;
