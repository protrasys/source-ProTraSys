import React, { useEffect } from "react";
import useStyles from "./Style";
import { getFormattedString } from "../../../../../Helper";
import { useSelector } from "react-redux";
import { fetchAllProjectGroups } from "../../../../../store/actions";
import { selectAllProjectGroups } from "../../../../../store/selectors";
import { Skeleton } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";

const ViewAllProjectGroups = () => {
  const classes = useStyles();

  // Retrieving All Project Groups from Database
  useEffect(() => {
    fetchAllProjectGroups();
  }, []);

  const AllGroupState = useSelector(selectAllProjectGroups);
  const isAllGroupRendering = AllGroupState.loading;
  const AllGroups = AllGroupState.data;

  const RenderAllGroups = () => {
    return isAllGroupRendering ? (
      <Skeleton variant="rect" animation="wave" height={500} />
    ) : (
      AllGroups &&
        AllGroups.map((data, index) => (
          <Box component="div" key={index} className={classes.root}>
            <Box component="div">
              <Typography variant="h3">Project Details</Typography>
            </Box>
          </Box>
        ))
    );
  };

  return (
    <div>
      <h1>View All Project Group</h1>
      {RenderAllGroups()}
    </div>
  );
};

export default ViewAllProjectGroups;
