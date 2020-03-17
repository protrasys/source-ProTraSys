import React from "react";
import useStyles from "./Style";
import { Skeleton } from "@material-ui/lab";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider
} from "@material-ui/core";
import { getFormattedString } from "../../../../../Helper";
import { selectFaculty } from "../../../../../store/selectors";
import { useSelector } from "react-redux";
import Moment from "react-moment";

function FacultyProfile() {
  const classes = useStyles();

  const FacultyDetails = useSelector(selectFaculty);
  const Faculty = { ...FacultyDetails.data };

  const RenderFacultyProfiles = () => (
    <Box variant="div" component="div" className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box variant="div">
            <img
              src={Faculty.profile}
              alt="Faculty Profile Image"
              className={classes.Img}
            />
          </Box>
          <Box variant="div">
            <Typography color="inherit" className={classes.Name}>
              {getFormattedString(Faculty.name)}
            </Typography>
            <Typography className={classes.designation} color="primary">
              {getFormattedString(Faculty.designation)}
            </Typography>
            <Box variant="div">
              <Typography className={classes.About} color="primary">
                About
              </Typography>
              <Typography className={classes.aboutFaculty}>
                <p>
                  Enrollment ID
                  <span>{getFormattedString(Faculty.enrollmentId)}</span>
                </p>
              </Typography>
              <Typography className={classes.aboutFaculty}>
                <p>
                  Phone Number <span>{getFormattedString(Faculty.phone)}</span>
                </p>
              </Typography>
              <Typography className={classes.aboutFaculty}>
                <p>Email Id {getFormattedString(Faculty.email)}</p>
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <Box variant="div" className={classes.Dates}>
          <Typography className={classes.JoiningDate}>
            Joining Date :
            <Moment format="DD/MM/YYYY HH:MM:SS">
              {getFormattedString(Faculty.createdAt)}
            </Moment>
          </Typography>
          <Typography className={classes.UpdatedAt}>
            Updated At :
            <Moment format="DD/MM/YYYY HH:MM:SS">
              {getFormattedString(Faculty.updatedAt)}
            </Moment>
          </Typography>
        </Box>
      </Card>
    </Box>
  );

  return (
    <div>
      <h1>Faculty Profile</h1>
      {FacultyDetails.loading ? (
        <Skeleton height={400} variant="rect" animation="wave" />
      ) : (
        RenderFacultyProfiles()
      )}
    </div>
  );
}

export default FacultyProfile;
