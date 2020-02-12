// Import Dependencies
import React, { useEffect } from 'react';
import useStyles from './Style';
import { Container, Typography, Box } from '@material-ui/core';

const LandingPage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = '𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 ℙ𝕣𝕠𝕋𝕣𝕒𝕊𝕪𝕤';
  }, []);

  return (
    <Container maxWidth='xl'>
      <Box component='div' className={classes.center}>
        <Typography variant='h6' className={classes.tagline}>
          Launching Soon
        </Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
