import React, { useEffect } from "react";
import { getFormattedString } from "../../../../../Helper";
import { fetchENoticeListing } from "../../../../../store/actions";
import useStyles from "./Style";
import { Box, Paper, Typography, Divider } from "@material-ui/core";
import { EventNote, Info } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import Moment from "react-moment";

// Import Redux Dependencies
import { useSelector } from "react-redux";
import { selectENotices } from "../../../../../store/selectors";

const ViewENotice = () => {
  const classes = useStyles();

  useEffect(() => {
    fetchENoticeListing();
  }, []);

  // Redux State Selectors
  const ENoticesResponse = useSelector(selectENotices);
  const ENotices = ENoticesResponse.data;

  // TODO: Style this Notice Component
  const RenderENotices = () => (
    <Box
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {ENotices &&
        ENotices.map(data => (
          <Box component={Paper} key={data._id} className={classes.notices}>
            <Box variant="div" className={classes.notice}>
              <Box
                variant="div"
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Box variant="div" className={classes.noticeIcon}>
                  <EventNote className={classes.icon} />
                </Box>
                <Box variant="div" className={classes.mobileInfo}>
                  <Info />
                </Box>
              </Box>
              <Box varint="div">
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={classes.noticeTitle} color="inherit">
                    {getFormattedString(data.title)}
                  </Typography>
                  <Info className={classes.desktopInfo} />
                </Box>

                <Typography className={classes.noticeDescription}>
                  {getFormattedString(data.description)}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box variant="div" className={classes.noticeOtherDetails}>
              <Typography className={classes.detail}>
                {getFormattedString(data.faculty.name)}
              </Typography>
              <Typography className={classes.detail}>
                <Moment format="DD/MM/YYYY">
                  {getFormattedString(data.createdAt)}
                </Moment>
              </Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );

  return (
    <div>
      <h1>View E Notice</h1>
      {!ENotices ? (
        <Skeleton variant="rect" height={400} animation="wave" />
      ) : (
        RenderENotices()
      )}
    </div>
  );
};

export default ViewENotice;
