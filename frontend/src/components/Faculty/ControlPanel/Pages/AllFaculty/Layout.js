import React, { useEffect } from "react";
import useStyles from "./Style";
import Moment from "react-moment";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider
} from "@material-ui/core";
import { getFormattedString } from "../../../../../Helper";
import { selectAllFaculties } from "../../../../../store/selectors";
import { GetAllFaculties } from "../../../../../store/actions";
import { useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";

function AllFaculty() {
  const classes = useStyles();

  useEffect(() => {
    GetAllFaculties();
  }, []);

  const AllFacultyState = useSelector(selectAllFaculties);
  const isAllFacultyLoading = AllFacultyState.loading;
  const AllFaculty = AllFacultyState.data;

  const RenderAllFaculties = () => {
    return (
      <Box component="div">
        <Grid container spacing={3}>
          {AllFaculty &&
            AllFaculty.map((data, index) => (
              <Grid item xs={12} s={6} md={6} lg={4}>
                <Card
                  key="index"
                  variant="elevation"
                  elevation="1"
                  className={classes.Card}
                >
                  <CardContent className={classes.CardContent}>
                    <Box component="div" className={classes.aboutFaculty}>
                      <Moment format="DD/MM/YYYY">
                        {getFormattedString(data.date.from)}
                      </Moment>
                      <Moment format="DD/MM/YYYY">
                        {getFormattedString(data.updatedAt)}
                      </Moment>
                    </Box>
                    <Box component="div">
                      <img
                        src={data.profile}
                        alt={data.name}
                        className={classes.profile}
                      />
                    </Box>
                    <Box component="div">
                      <Typography color="inherit" className={classes.name}>
                        {getFormattedString(data.name)}
                      </Typography>
                      <Typography className={classes.designation}>
                        {getFormattedString(data.designation)}
                      </Typography>
                      <Typography className={classes.aboutFaculty}>
                        <span>Email</span>
                        <span>{getFormattedString(data.email)}</span>
                      </Typography>
                      <Divider />
                      <Typography className={classes.aboutFaculty}>
                        <span>Phone</span>
                        <span>{getFormattedString(data.phone)}</span>
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box component="div" className={classes.skills}>
                    <Typography
                      color="inherit"
                      className={classes.skillsHeading}
                    >
                      Skills
                    </Typography>
                    <Box style={{ display: "flex", flexWrap: "wrap" }}>
                      {getFormattedString(
                        data.skills.map(value => (
                          <Typography className={classes.IndividualSkills}>
                            {value}
                          </Typography>
                        ))
                      )}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  };
  return isAllFacultyLoading ? (
    <Skeleton variant="rect" height={500} animation="wave" />
  ) : (
    RenderAllFaculties()
  );
}

export default AllFaculty;
