import React, { Component } from "react";
import useStyles from "./Style";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  withStyles
} from "@material-ui/core";
import { Check, AccountCircle } from "@material-ui/icons";
import Avatar from "../../../../assets/avatar-images-png-9.png";

export class AllFaculty extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Box variant="div">
        <Box variant="div">
          <Card className={classes.card}>
            <CardContent className={classes.facultyDetails}>
              <Box variant="div">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className={classes.responsiveImg}
                />
              </Box>
              <Box variant="div">
                <Typography variant="h6" className={classes.name}>
                  Girish Dave
                </Typography>
                <Typography className={classes.text}>
                  Professor at BPCCS <br />
                  Gandhinagar, Gujarat
                </Typography>
                <Button size="large" className={classes.btn}>
                  View Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }
}

export default withStyles(useStyles)(AllFaculty);
