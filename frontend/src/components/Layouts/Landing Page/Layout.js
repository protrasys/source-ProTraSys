// Import Dependencies
import React, { useEffect } from 'react';
import useStyles from './Style';
import { Container, Typography, Box, Button, Card, CardActions, CardContent, Grid } from '@material-ui/core';
import ReactCarousel from './Carousel';

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
            <Grid item xs={12} md={4} xl={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, modi.
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} xl={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, modi.
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} xl={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, modi.
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
