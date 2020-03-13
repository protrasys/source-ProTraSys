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

class StudentSignUp extends Component {
  state = {
    name: "",
    sem: "",
    enrollmentId: "",
    email: "",
    phone: "",
    password: "",
    projectGroupId: "",
    teamLeader: ""
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
      sem,
      enrollmentId,
      email,
      phone,
      password,
      projectGroupId,
      teamLeader
    } = this.state;
    const values = {
      name,
      sem,
      enrollmentId,
      email,
      phone,
      password,
      projectGroupId,
      teamLeader
    };

    return (
      <Box className={classes.root} component="div">
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
              Use your Student Account
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
                type="number"
                name="sem"
                label="Sem"
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
                name="projectGroupId"
                label="Project Group Id"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="teamLeader"
                label="Team Leader"
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

export default withStyles(useStyles)(StudentSignUp);
