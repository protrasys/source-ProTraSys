// Import Dependencies
import React, { useEffect } from 'react';
import useStyles from './Style';
import { Container, Typography, Box, Button } from '@material-ui/core';

const LandingPage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = '𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 ℙ𝕣𝕠𝕋𝕣𝕒𝕊𝕪𝕤';
  }, []);

  return (
    <Container maxWidth='xl'>
      <Box component='div' className={classes.center}>
        <Typography variant='h5' className={classes.tagline}>
          Launching Soon
        </Typography>
        <Typography variant='h2' className={classes.heading}>
          тracĸ yoυr projecт onlιne
        </Typography>
        <Typography variant='caption' className={classes.moto}>
          Upload Day to Day Reports and get notified when Faculty gives their
          feedbacks, <br /> Speedup your development cycle with Online Reporting
          and Backup Services
        </Typography>
        <br />
        <Button
          className={classes.signUpButton}
          disableElevation
          color='secondary'
          variant='contained'
          size='large'
        >
          Sign Up now, It's Free
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
