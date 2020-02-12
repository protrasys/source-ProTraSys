// Import Dependencies
import React, { useEffect } from 'react';
import useStyles from './Style';
import { Container, Typography, Box, Button, List } from '@material-ui/core';
import BGForCarousel from '../../../assets/BG for Carousel.png';
import Pic1 from '../../../assets/pic (1).jpg';
import Pic2 from '../../../assets/pic (2).jpg';
import Pic3 from '../../../assets/pic (3).jpg';
import Pic4 from '../../../assets/pic (4).jpg';
import ReactCarousel from 'react-material-ui-carousel';

const LandingPage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = '𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 ℙ𝕣𝕠𝕋𝕣𝕒𝕊𝕪𝕤';
  }, []);

  return (
    <Box component='div'>
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
          <Button
            className={classes.signUpButton}
            disableElevation
            color='primary'
            variant='contained'
            size='large'
          >
            Welcome Back, Login Now
          </Button>
          <br />
          <Typography variant='caption' className={classes.caption}>
            Not have an account, Contact to Your Faculty
          </Typography>
        </Box>
      </Container>
      <Box component='div' className={classes.carouselDivision}>
        <img className={classes.carouselBgImage} alt='' src={BGForCarousel} />
        <Box component='div'>
          <ReactCarousel
            autoPlay={true}
            interval={5000}
            indicators={false}
            animation='slide'
            className={classes.carouselItem}
          >
            <List className={classes.List}>
              <img src={Pic1} alt='' className={classes.carouselInnerImage} />
            </List>
            <List className={classes.List}>
              <img src={Pic2} alt='' className={classes.carouselInnerImage} />
            </List>
            <List className={classes.List}>
              <img src={Pic3} alt='' className={classes.carouselInnerImage} />
            </List>
            <List className={classes.List}>
              <img src={Pic4} alt='' className={classes.carouselInnerImage} />
            </List>
          </ReactCarousel>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
