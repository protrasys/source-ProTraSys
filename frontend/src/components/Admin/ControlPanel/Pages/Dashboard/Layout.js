import React, { Fragment, useEffect } from "react";
import useStyles from "./Style";
import { Typography } from "@material-ui/core";
import { getFormattedString } from "../../../../../Helper";
import { Skeleton } from "@material-ui/lab";
import { fetchCountAllDocuments } from "../../../../../store/actions";
import { selectCountedAllDocuments } from "../../../../../store/selectors";
import { useSelector } from "react-redux";

// Importing Charts
import {
  FileUploadedOnChart,
  ENoticeAnalysisChart,
  StudentRegisteredChart
} from "./Charts";

const Layout = () => {
  const classes = useStyles();
  const allDocumentsState = useSelector(selectCountedAllDocuments);
  const data = { ...allDocumentsState.data };

  useEffect(() => {
    fetchCountAllDocuments();
  }, []);

  return allDocumentsState.loading ? (
    <Skeleton height={700} variant="rect" animation="wave" />
  ) : (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.studentChartsRow}>
          <Typography>{getFormattedString(data.allStu)} Students</Typography>
        </div>
        <div className={classes.facultyChartsRow}>
          <Typography>{getFormattedString(data.allFac)} Faculties</Typography>
        </div>
        <div className={classes.groupChartsRow}>
          <Typography>
            {getFormattedString(data.allProjectGroups)} ProjectGroups
          </Typography>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.noticeRow}>
          <Typography>
            {getFormattedString(data.allENotices)} Notices
          </Typography>
        </div>
        <div className={classes.reportingsRow}>
          <Typography>
            {getFormattedString(data.allEReports)} Reportings
          </Typography>
        </div>
        <div className={classes.filesUploadedRow}>
          <Typography>
            {getFormattedString(data.allProjectFiles)} Files Uploaded
          </Typography>
        </div>
      </div>

      <div className={classes.mongodbCharts}>
        <FileUploadedOnChart />
        <ENoticeAnalysisChart />
        <StudentRegisteredChart />
      </div>
    </Fragment>
  );
};

export default Layout;
