import React, { Component } from 'react';
import { Grid, Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText, Icon, AccessAlarm, ThreeDRotation } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import IdeaPlan from '../../../../assets/undraw_ideas_s70l.svg';
import DevelopIdea from '../../../../assets/undraw_forming_ideas_0pav.svg';
import ValidateConcept from '../../../../assets/undraw_mind_map_cwng.svg';
import BusinessPlan from '../../../../assets/undraw_business_plan_5i9d.svg';
import useStyles from './Style';


const About = (props) => {
    const classes = useStyles();
    const { title, heading, paragraph } = props;

    return(

        <Grid container spacing={3}>
            <Grid item md={6} xl={6}>
                <img src={IdeaPlan}  alt='' className={classes.img}/>
            </Grid>
            <Grid item md={6} xl={6}>
                <Box component="div" className={classes.main}>
                    <Typography variant="h5" className={classes.title}>
                        IDEA PLAN
                    </Typography>
                    <Typography variant='h3' component="h3" className={classes.heading}>
                        Make A One-Page Plan
                    </Typography>
                    <Typography variant='p' component="p" className={classes.paragraph}>
                        Design the basic business model on a single page, share it with others, and get a better understanding of your idea before going into details.
                    </Typography>
                    <List component="nav" aria-label="main listitem folders" className={classes.listItem}>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Get an example from your industry" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Structure your idea in less then an hour" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Brainstorm it with others" />
                        </ListItem>
                    </List>
                    <Button variant="outlined" size="large" className={classes.btn}>Learn More</Button>    
                </Box>
            </Grid>

            <Grid item md={6} xl={6}>
                <Box component="div" className={classes.main}>
                    <Typography variant="h5" className={classes.title}>
                        STORY MODE
                    </Typography>
                    <Typography variant='h3' component="h3" className={classes.heading}>
                        Develop Your Idea
                    </Typography>
                    <Typography variant='p' component="p" className={classes.paragraph}>
                        Sketch the concept, research the market, find out what's required to set up your business, and forecast performance. Check every aspect before taking the plunge, so nothing can come back to bite you.
                    </Typography>
                    <List component="nav" aria-label="main listitem folders" className={classes.listItem}>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Follow step-by-step guidance" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="See the relevant examples" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Calculate profit and cash flow without being finance-savvy" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Get the 360 degree view of your idea" />
                        </ListItem>
                    </List>
                    <Button variant="outlined" size="large" className={classes.btn}>Learn More</Button>    
                </Box>
            </Grid>
            <Grid item md={6} xl={6}>
                <img src={DevelopIdea}  alt='' className={classes.img}/>
            </Grid>

            <Grid item md={6} xl={6}>
                <img src={ValidateConcept}  alt='' className={classes.img}/>
            </Grid>
            <Grid item md={6} xl={6}>
                <Box component="div" className={classes.main}>
                    <Typography variant="h5" className={classes.title}>
                        VALIDATION
                    </Typography>
                    <Typography variant='h3' component="h3" className={classes.heading}>
                        Validate The Concept
                    </Typography>
                    <Typography variant='p' component="p" className={classes.paragraph}>
                        Once you’ve completed Story Mode, our algorithm calculates the final score for your idea and gives recommendations for improvement. You can also share the concept with friends, in a simple format, to get their feedback.
                    </Typography>
                    <List component="nav" aria-label="main listitem folders" className={classes.listItem}>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Check your idea’s score" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="See recommendations" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Share the concept and get feedback" />
                        </ListItem>
                    </List>
                    <Button variant="outlined" size="large" className={classes.btn}>Learn More</Button>    
                </Box>
            </Grid>

            <Grid item md={6} xl={6}>
                <Box component="div" className={classes.main}>
                    <Typography variant="h5" className={classes.title}>
                        JOURNAL
                    </Typography>
                    <Typography variant='h3' component="h3" className={classes.heading}>
                        Get A Business Plan
                    </Typography>
                    <Typography variant='p' component="p" className={classes.paragraph}>
                        Your entire idea will be stored in the Journal, which becomes an internal business plan that you can show to investors and friends.
                    </Typography>
                    <List component="nav" aria-label="main listitem folders" className={classes.listItem}>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Generate an internal business plan" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon  className={classes.check}>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Export to PDF or Word
                            Learn more" />
                        </ListItem>
                    </List>
                    <Button variant="outlined" size="large" className={classes.btn}>Learn More</Button>    
                </Box>
            </Grid>
            <Grid item md={6} xl={6}>
                <img src={BusinessPlan}  alt='' className={classes.img}/>
            </Grid>
        </Grid>
        
    );
}

export default About