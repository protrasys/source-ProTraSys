// Import Dependencies
import React, { useEffect } from 'react';
import useStyles from './Style';
import Appbar from '../Partials/AppBar';

import Footer from '../Partials/Footer';
import { Container, Typography, Box, Button, Grid } from '@material-ui/core';
import {
  EmojiObjectsOutlined,
  MenuBookOutlined,
  ExploreOutlined,
  PollOutlined,
} from '@material-ui/icons';
// import ReactCarousel from './Carousel';

import Cards from './Cards';
import About from './About';
import { Link } from 'react-router-dom';
const Responsiveness = require('../../.././assets/Demo.jpg');

const LandingPage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = '𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 ℙ𝕣𝕠𝕋𝕣𝕒𝕊𝕪𝕤';
  }, []);

  return (
    <Box component='div'>
      <Container maxWidth='xl'>
        <Appbar />
        <Box component='div' className={classes.center}>
          <Typography variant='h6' className={classes.tagline}>
            Yes, we are here to help you during this pandemic
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
          <Typography variant='caption'>
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
              heading='Project Initialization'
              subHeading='Define Title, Description and Technology used.'
              text='Here group of students will find best and suitable concept or idea for thier Grand Project'
            />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards
              icon={<MenuBookOutlined />}
              heading='Faculty Guidance'
              subHeading='Project mentor guide students about thier project'
              text='In this process, Project incharge generally understands the project importants and either they accept project or may ask for some changes.'
            />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards
              icon={<ExploreOutlined />}
              heading='Group Reporting'
              subHeading='Group of students reports thier work to mentor'
              text='After understanding the requirements and feedbacks of faculty, Students complete thier task and upload thier work'
            />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards
              icon={<PollOutlined />}
              heading='Report Generation'
              subHeading='Faculty will evaluate students uploaded work and report that work'
              text='Here, Faculty will give thier feedback and our system will send emails to both student and faculty for confirmation of reporting'
            />
          </Grid>
        </Grid>

        <Box component='div' className={classes.center}>
          <Typography variant='h3' style={{ marginBottom: '1rem' }}>
            You can report your work everyday, no <br />
            matter where you are
          </Typography>
          <Typography paragraph style={{ color: '#666666' }}>
            Be it a beach bar, mountain hike, or executive meeting — wherever
            you <br />
            are struck by inspiration, you can easily capture your thoughts on
            your <br />
            laptop, mobile, or tablet.
          </Typography>
          <img
            src={Responsiveness}
            alt=''
            style={{ width: '100%', marginTop: '2rem' }}
          />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default LandingPage;
