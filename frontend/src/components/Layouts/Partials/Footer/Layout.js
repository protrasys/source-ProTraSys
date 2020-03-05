import React from 'react';
import { Box, Typography, Button, Divider } from '@material-ui/core';
import useStyles from './Style';
import { Email, Facebook, Instagram } from '@material-ui/icons';
import Logo from '../../../../assets/ProTraSys_Logo_light.png';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box variant='div' className={classes.center}>
      <Typography variant='h3' className={classes.heading}>
        Test ProTraSys for FREE!
      </Typography>
      <Typography paragraph className={classes.para}>
        BETA version is out! Try it now for a limited time.
        <br />
        No credit card required - only your curiosity and goodwill.
        <br />
      </Typography>
      <Button className={classes.btn} size='large'>
        Start Now - It's Free
      </Button>
      <Typography style={{ fontSize: '0.8rem' }}>
        Seriously. No credit card required.
      </Typography>
      <Divider className={classes.divider}></Divider>
      <Box variant='div' className={classes.left}>
        <img src={Logo} alt='Logo' style={{ width: '70px' }} />
        <Box variant='div'>
          <Email className={classes.icon} />
          <Facebook className={classes.icon} />
          <Instagram className={classes.icon} />
        </Box>
      </Box>
      <Typography paragraph className={classes.copyright}>
        Copyright © ProTraSys 2020. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
