import React, { Component } from 'react'
import PageNotFoundImg from '../../../../assets/undraw_page_not_found_su7k.svg';
import useStyles from './Style';
import { Box, Typography } from '@material-ui/core';


const PageNotFound = () => {
    const classes = useStyles();
    return(
        <Box variant="div" className={classes.center}>
            <img src={PageNotFoundImg} alt="" className={classes.img} />
            <Typography variant="h2" style={{marginTop: '3rem'}}>Page Not Found</Typography>
        </Box>
    )
}

export default PageNotFound;
