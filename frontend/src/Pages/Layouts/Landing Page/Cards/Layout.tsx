import React from 'react';
import { CardContent, Card, Typography, Box } from '@material-ui/core';
import useStyles from './Style';

const Cards = (props: any) => {
  const classes = useStyles();
  const { heading, subHeading, text, icon } = props;

  return (
    <Box component='div'>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h5' className={classes.heading}>
            {icon} {heading}
          </Typography>
          <Typography variant='body1' className={classes.subHeading}>
            {subHeading}
          </Typography>
          <Typography variant='body2'>{text}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Cards;
