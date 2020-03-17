import React from "react";
import useStyles from "./Style";
import { Skeleton } from "@material-ui/lab";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button
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
          <Box className={classes.facultyInfo} component="div">
            <Box className={classes.facultyDates} component="div">
              <Moment format="DD/MM/YYYY">
                {getFormattedString(Faculty.createdAt)}
              </Moment>
              <Moment format="DD/MM/YYYY">
                {getFormattedString(Faculty.updatedAt)}
              </Moment>
            </Box>
            <Box component="div">
              <img
                src={Faculty.profile}
                alt="Faculty Profile Image"
                className={classes.profileImg}
              />
            </Box>
            <Typography className={classes.facultyName}>
              {getFormattedString(Faculty.name)}
            </Typography>
            <Typography className={classes.facultyDesignation}>
              {getFormattedString(Faculty.designation)}
            </Typography>
            <Button variant="contained" className={classes.btn}>
              Send Email
            </Button>
          </Box>
          <Box component="div">
            <Box component="div" style={{ padding: "2rem" }}>
              <Typography
                className={classes.heading}
                style={{
                  marginBottom: ".5rem",
                  fontSize: ".9rem",
                  fontWeight: "500",
                  textTransform: "uppercase"
                }}
              >
                Official Information
              </Typography>
              <Box
                component="div"
                style={{
                  display: "flex"
                }}
              >
                <Box component="div">
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      fontWeight: "500",
                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    {getFormattedString(Faculty.email)}
                  </Typography>
                </Box>
                <Box component="div">
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      fontWeight: "500",
                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    {getFormattedString(Faculty.phone)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box component="div" style={{ padding: "2rem" }}>
              <Typography
                className={classes.heading}
                style={{
                  marginBottom: ".5rem",
                  fontSize: ".9rem",
                  fontWeight: "500",
                  textTransform: "uppercase"
                }}
              >
                Personal Information
              </Typography>
              <Box
                component="div"
                style={{
                  display: "flex"
                }}
              >
                <Box component="div">
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      fontWeight: "500",
                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    Enrollment ID
                  </Typography>
                  <Typography
                    style={{
                      fontSize: ".8rem",

                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    {getFormattedString(Faculty.enrollmentId)}
                  </Typography>
                </Box>
                <Box component="div">
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      fontWeight: "500",
                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      color: "#ccc",
                      marginRight: "1rem"
                    }}
                  >
                    {getFormattedString(Faculty.phone)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box component="div" style={{ padding: "2rem" }}>
              <Typography
                className={classes.heading}
                style={{
                  marginBottom: ".5rem",
                  fontSize: ".9rem",
                  fontWeight: "500",
                  textTransform: "uppercase"
                }}
              >
                Skills
              </Typography>
              <Box
                component="div"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {Faculty.skills &&
                  Faculty.skills.map(value => (
                    <Box component="div">
                      <Typography
                        className={classes.FacultySkills}
                        style={{
                          border: "1px solid #777",
                          padding: ".6rem .8rem",
                          borderRadius: ".15rem",
                          fontWeight: "100",
                          fontSize: ".9rem",
                          marginRight: ".8rem",
                          marginBottom: ".8rem"
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
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
