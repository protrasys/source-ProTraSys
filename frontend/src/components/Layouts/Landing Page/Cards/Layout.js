import React, { Component } from 'react';
import { CardContent, Card, Typography, Box } from '@material-ui/core';
import useStyles from './Style';

const Cards = (props) =>{

    const classes = useStyles();
    const { heading, subHeading, text, icon } = props;

        return (
            <Box component="div">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.heading}>
                            {icon} {heading}
                        </Typography>
                        <Typography variant="p" component="p" className={classes.subHeading}>
                            {subHeading}
                        </Typography>
                        <Typography variant="body2" component="p" className={classes.text}>
                            {text}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
}

export default Cards;
