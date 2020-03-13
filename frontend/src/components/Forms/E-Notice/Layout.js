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

class E_Notice extends Component {
  state = {
    faculty: "",
    title: "",
    image: "",
    file: "",
    description: ""
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

    const { faculty, title, image, file, description } = this.state;

    const values = {
      faculty,
      title,
      image,
      file,
      description
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
              Use your E-Notice Account
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
                name="title"
                label="Title"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="image"
                label="Image"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="file"
                name="file"
                label="File"
                variant="outlined"
                fullWidth="true"
                required
                values={values}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                type="text"
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows="4"
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
        </Card>
      </Box>
    );
  }
}

export default withStyles(useStyles)(E_Notice);
