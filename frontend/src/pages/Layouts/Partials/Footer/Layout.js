import React from "react";
import { Box, Typography, Button, Divider } from "@material-ui/core";
import useStyles from "./Style";
import { Email, GitHub, Instagram, Facebook } from "@material-ui/icons";
import Logo from "../../../../assets/ProTraSys_Logo_light.png";

const Footer = () => {
  const classes = useStyles();

  return (
    <Box variant="div" className={classes.center}>
      <Typography variant="h3" className={classes.heading}>
        Test ProTraSys for FREE!
      </Typography>
      <Typography paragraph className={classes.para}>
        BETA version is out! Try it now for a limited time.
        <br />
        No credit card required - only your curiosity and goodwill.
        <br />
      </Typography>
      <Button className={classes.btn} size="large" href="/studentLogin">
        Start Now - It's Free
      </Button>
      <Typography style={{ fontSize: "0.8rem" }}>
        Seriously. No credit card required.
      </Typography>
      <Divider className={classes.divider}></Divider>
      <Box variant="div" className={classes.left}>
        <Box component="div">
          <a href="/">
            <img src={Logo} alt="Logo" className={classes.img} />
          </a>
        </Box>
        <Box variant="div">
          <a href="https://github.com/protrasys" className={classes.icon}>
            <GitHub />
          </a>
          <a className={classes.icon}>
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
