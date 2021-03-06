import React from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import useStyles from './Style';
const IdeaPlan = require('../../../../assets/undraw_ideas_s70l.svg');
const DevelopIdea = require('../../../../assets/undraw_forming_ideas_0pav.svg');
const ValidateConcept = require('../../../../assets/undraw_mind_map_cwng.svg');
const BusinessPlan = require('../../../../assets/undraw_business_plan_5i9d.svg');

const About = (props: any) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item md={6} xl={6}>
        <img src={IdeaPlan} alt='' className={classes.img} />
      </Grid>
      <Grid item md={6} xl={6}>
        <Box component='div' className={classes.main}>
          <Typography variant='h5' className={classes.title}>
            Idea Plan
          </Typography>
          <Typography variant='h3' className={classes.heading}>
            Create a one-page business plan
          </Typography>
          <Typography paragraph className={classes.paragraph}>
            Structure your idea and cover all the major points on a business
            canvas, which lets you brainstorm easily with friends and partners.
          </Typography>
          <List
            component='nav'
            aria-label='main listitem folders'
            className={classes.listItem}
          >
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Get an example from your industry' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Structure your idea in less then an hour' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Brainstorm it with others' />
            </ListItem>
          </List>
          <Button variant='outlined' size='large' className={classes.btn}>
            Learn More
          </Button>
        </Box>
      </Grid>

      <Grid item md={6} xl={6}>
        <Box component='div' className={classes.main}>
          <Typography variant='h5' className={classes.title}>
            Story Mode
          </Typography>
          <Typography variant='h3' className={classes.heading}>
            Develop Your Idea
          </Typography>
          <Typography paragraph className={classes.paragraph}>
            Sketch the concept, research the market, find out what's required to
            set up your business, and forecast performance. Check every aspect
            before taking the plunge, so nothing can come back to bite you.
          </Typography>
          <List
            component='nav'
            aria-label='main listitem folders'
            className={classes.listItem}
          >
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Follow step-by-step guidance' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='See the relevant examples' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Calculate profit and cash flow without being finance-savvy' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Get the 360 degree view of your idea' />
            </ListItem>
          </List>
          <Button variant='outlined' size='large' className={classes.btn}>
            Learn More
          </Button>
        </Box>
      </Grid>
      <Grid item md={6} xl={6}>
        <img src={DevelopIdea} alt='' className={classes.img} />
      </Grid>

      <Grid item md={6} xl={6}>
        <img src={ValidateConcept} alt='' className={classes.img} />
      </Grid>
      <Grid item md={6} xl={6}>
        <Box component='div' className={classes.main}>
          <Typography variant='h5' className={classes.title}>
            Validation
          </Typography>
          <Typography variant='h3' className={classes.heading}>
            Validate The Concept
          </Typography>
          <Typography paragraph className={classes.paragraph}>
            Once you’ve completed Story Mode, our algorithm calculates the final
            score for your idea and gives recommendations for improvement. You
            can also share the concept with friends, in a simple format, to get
            their feedback.
          </Typography>
          <List
            component='nav'
            aria-label='main listitem folders'
            className={classes.listItem}
          >
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Check your idea’s score' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='See recommendations' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Share the concept and get feedback' />
            </ListItem>
          </List>
          <Button variant='outlined' size='large' className={classes.btn}>
            Learn More
          </Button>
        </Box>
      </Grid>

      <Grid item md={6} xl={6}>
        <Box component='div' className={classes.main}>
          <Typography variant='h5' className={classes.title}>
            Journal
          </Typography>
          <Typography variant='h3' className={classes.heading}>
            Get A Business Plan
          </Typography>
          <Typography paragraph className={classes.paragraph}>
            Your entire idea will be stored in the Journal, which becomes an
            internal business plan that you can show to investors and friends.
          </Typography>
          <List
            component='nav'
            aria-label='main listitem folders'
            className={classes.listItem}
          >
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Generate an internal business plan' />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.check}>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                primary='Export to PDF or Word
                            Learn more'
              />
            </ListItem>
          </List>
          <Button variant='outlined' size='large' className={classes.btn}>
            Learn More
          </Button>
        </Box>
      </Grid>
      <Grid item md={6} xl={6}>
        <img src={BusinessPlan} alt='' className={classes.img} />
      </Grid>
    </Grid>
  );
};

export default About;
