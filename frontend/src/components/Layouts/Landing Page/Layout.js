// Import Dependencies
import React, { useEffect } from 'react';
import useStyles from './Style';
import Appbar from '../Partials/AppBar';
import { Container, Typography, Box, Button, Grid } from '@material-ui/core';
import {
  MenuBookOutlined,
  ExploreOutlined,
  PollOutlined,
  EmojiObjectsOutlined
} from '@material-ui/icons';

// import ReactCarousel from './Carousel';
import Cards from './Cards';
import About from './About';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = '𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 ℙ𝕣𝕠𝕋𝕣𝕒𝕊𝕪𝕤';
  }, []);

  return (
    <Box component='div'>
      <Appbar />
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
            feedbacks, <br /> Speedup your development cycle with Online
            Reporting and Backup Services
          </Typography>
          <br />
          <Link to='/studentlogin' style={{ textDecoration: 'none' }}>
            <Button
              className={classes.signUpButton}
              disableElevation
              color='primary'
              variant='contained'
              size='large'
            >
              Welcome Back, Login Now
            </Button>
          </Link>
          <br />
          <Typography variant='caption' className={classes.caption}>
            Not have an account, Contact to Your Faculty
          </Typography>
        </Box>
      </Container>

      <Container maxWidth='xl'>
        <Box component='div' className={classes.center}>
          <Typography variant='h3' className={classes.heading}>
            hσw cαn prσtrαsчs hєlp чσu?
          </Typography>
          <Typography variant='caption' className={classes.moto}>
            You have a groundbreaking idea, but you feel lost, alone, or just
            uncertain <br /> your execution will live up to the idea. Sound
            familiar? <br /> ProTraSys will light your way from concept to
            completion.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3} xl={3}>
            <Cards
              icon={<EmojiObjectsOutlined />}
              heading='IDEA PLAN'
              subHeading='Create a one-page business plan'
              text='Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners.'
            />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards
              icon={<MenuBookOutlined />}
              heading='STORY MODE'
              subHeading='Develop the idea through Story Mode'
              text='Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners.'
            />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards
              icon={<ExploreOutlined />}
              heading='VALIDATION'
              subHeading='Test-run and get a validation score'
              text='Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners.'
            />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards
              icon={<PollOutlined />}
              heading='JOURNAL'
              subHeading='Get an internal business plan'
              text='Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners.'
            />
          </Grid>
        </Grid>

        <About />
      </Container>
    </Box>
  );
};

export default LandingPage;
