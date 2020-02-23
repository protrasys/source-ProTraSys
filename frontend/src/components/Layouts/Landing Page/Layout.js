// Import Dependencies
import React, { useEffect } from 'react';
import useStyles from './Style';
// import Appbar from '../Partials/Appbar';
import { Container, Typography, Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { EmojiObjectsOutlined, MenuBookOutlined, ExploreOutlined, PollOutlined, Check } from '@material-ui/icons';
// import ReactCarousel from './Carousel';
import Cards from './Cards';
import About from './About';

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
            <Cards icon={<EmojiObjectsOutlined />} heading="IDEA PLAN" subHeading="Create a one-page business plan" text="Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners." />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards icon={<MenuBookOutlined />} heading="STORY MODE" subHeading="Develop the idea through Story Mode" text="Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners." />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards icon={<ExploreOutlined />} heading="VALIDATION" subHeading="Test-run and get a validation score" text="Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners." />
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Cards icon={<PollOutlined />} heading="JOURNAL" subHeading="Get an internal business plan" text="Structure your idea and cover all the major points on a business canvas, which lets you brainstorm easily with friends and partners." />
          </Grid>
        </Grid>
        
        <About /> 

        <Box variant='div' className={classes.center}>
          <Box component='div' className={classes.svg} container> 
            <Typography variant='h4' className={classes.center}>
                  ...and we've only scratched the surface. Check what else you <br/> can do with IdeaBuddy
            </Typography>
            <Grid container className={classes.center}>  
              <Grid item xs={12} md={4} xl={4}>
                <List component="nav" aria-label="main listitem folders" className={classes.listItem} style={{marginLeft: "5rem"}}>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Follow step-by-step guidance" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="See the relevant examples" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Calculate profit and cash flow without being finance-savvy" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Get the 360 degree view of your idea" />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={4} xl={4}>
                <List component="nav" aria-label="main listitem folders" className={classes.listItem} style={{margin: "0 1rem"}}>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Follow step-by-step guidance" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="See the relevant examples" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Calculate profit and cash flow without being finance-savvy" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Get the 360 degree view of your idea" />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={4} xl={4}>
                <List component="nav" aria-label="main listitem folders" className={classes.listItem} style={{marginRight: "5rem"}}>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Follow step-by-step guidance" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="See the relevant examples" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Calculate profit and cash flow without being finance-savvy" />
                  </ListItem>
                  <ListItem>
                      <ListItemIcon  className={classes.check}>
                          {<Check/>}
                      </ListItemIcon>
                      <ListItemText primary="Get the 360 degree view of your idea" />
                  </ListItem>
                </List>
              </Grid> 
            </Grid>
            <Typography variant='p' style={{color:'#666', fontSize: '1rem'}}>
              Don’t be afraid of customer profiling, competitor analysis, financials, or administrative <br/>procedures. At every step of the journey, you’ll be guided and shown a relevant example. We <br/> want to make sure you are on the right track.
            </Typography>
          </Box>
          <Button className={classes.btn} size='large'>Start Now - It's Free</Button>
          <Typography style={{fontSize: '0.8rem'}}> 
            Seriously. No credit card required.
          </Typography>
        </Box>
        
      </Container>
    </Box>
  );
};

export default LandingPage;
