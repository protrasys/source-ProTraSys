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
  withStyles
} from "@material-ui/core";

class FacultySignUp extends Component {
  state = {
    name: "",
    date: "",
    profile: "",
    enrollmentId: "",
    email: "",
    phone: "",
    password: "",
    designation: "",
    skills: ""
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

    const {
      name,
      date,
      profile,
      enrollmentId,
      email,
      phone,
      password,
      designation,
      skills
    } = this.state;

    const values = {
      name,
      date,
      profile,
      enrollmentId,
      email,
      phone,
      password,
      designation,
      skills
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
              Use your Faculty Account
            </Typography>
            <form>
              <TextField
                type="text"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="date"
                name="date"
                label="date"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="profile"
                label="Profile"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="enrollmentId"
                label="Enrollment Id"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="number"
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="designation"
                label="Designation"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="skills"
                label="Skills"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
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
          <Typography className={classes.signIn}>
            Already, have an account ?{" "}
            <a href="/studentlogin" className={classes.link}>
              Sign In
            </a>
          </Typography>
        </Card>
      </Box>
    );
  }
}

export default withStyles(useStyles)(FacultySignUp);
