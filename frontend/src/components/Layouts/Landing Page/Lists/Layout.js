import React, { Component } from 'react'
import useStyles from './Style';
import { Container, Typography, Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Check } from '@material-ui/icons';


const Lists = () => {
    const classes = useStyles();

    return(
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
                <List component="nav" aria-label="main listitem folders" className={classes.listItem} style={{padding: '0 3rem'}}>
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
    )
}

export default Lists
