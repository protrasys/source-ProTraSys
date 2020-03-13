import React, { Component } from "react";
import useStyles from "./Style";
import ProTraSys from "../../../assets/ProTraSys_Logo.png";

import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Button,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

class EReports extends Component {
  state = {
    discussion: "",
    feedback: "",
    faculty: "",
    projectGroup: "",
    status: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = () => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    const { discussion, feedback, faculty, projectGroup, status } = this.state;

    const values = {
      discussion,
      feedback,
      faculty,
      projectGroup,
      status
    };

    return (
      <Box component="div" variant="div" className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <img
              src={ProTraSys}
              alt="ProTraSys_ Logo"
              style={{ width: "3rem" }}
            />
            <Typography variant="h5" style={{ marginBottom: ".5rem" }}>
              Sign Up
            </Typography>
            <Typography style={{ marginBottom: "1rem", color: "#999" }}>
              Use your E-Reports Account
            </Typography>
            <form>
              <TextField
                type="text"
                name="faculty"
                label="Faculty"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="projectGroup"
                label="Project Group"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="discussion"
                label="Discussion"
                variant="outlined"
                multiline
                rows="4"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="feedback"
                label="Feedback"
                variant="outlined"
                multiline
                rows="4"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <FormControl variant="outlined" fullWidth="true">
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  fullWidth="true"
                  onChange={this.handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              className={classes.btn}
              onClick={this.handleClick}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
}

export default withStyles(useStyles)(EReports);
