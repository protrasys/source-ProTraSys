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

class AdminLogin extends Component {
  state = {
    id: "",
    name: "",
    password: ""
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

    const { id, name, password } = this.state;

    const values = {
      id,
      name,
      password
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
              Sign In
            </Typography>
            <Typography style={{ marginBottom: "1rem", color: "#999" }}>
              Use your Admin Account
            </Typography>
            <form>
              <TextField
                type="text"
                name="id"
                label="ID"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
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

export default withStyles(useStyles)(AdminLogin);
