import React from 'react';
import { Box, Typography, Button, Divider } from '@material-ui/core';
import useStyles from './Style';
import { Email, GitHub } from '@material-ui/icons';
import { Link } from 'react-router-dom';
const Logo = require('../../../../assets/ProTraSys_Logo_light.png');

const Footer = () => {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.center}>
      <Typography variant='h3' className={classes.heading}>
        Test ProTraSys for FREE!
      </Typography>
      <Typography paragraph className={classes.para}>
        BETA version is out! Try it now for a limited time.
        <br />
        No credit card required - only your curiosity and goodwill.
        <br />
      </Typography>
      <Link to='/studentcontrolpanel'>
        <Button className={classes.btn} size='large'>
          Start Now - It's Free
        </Button>
      </Link>
      <Typography style={{ fontSize: '0.8rem' }}>
        Seriously. No credit card required.
      </Typography>
      <Divider className={classes.divider}></Divider>
      <Box component='div' className={classes.left}>
        <Box component='div'>
          <Link to='/'>
            <img src={Logo} alt='Logo' className={classes.img} />
          </Link>
        </Box>
        <Box component='div'>
          <a
            href='https://github.com/protrasys'
            target='_blank'
            className={classes.icon}
          >
            <GitHub />
          </a>
          <a
            href='mailto:bhaainichaal@yahoo.in'
            target='_blank'
            className={classes.icon}
          >
            <Email />
          </a>
        </Box>
      </Box>
      <Typography paragraph className={classes.copyright}>
        Copyright © ProTraSys 2020. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
