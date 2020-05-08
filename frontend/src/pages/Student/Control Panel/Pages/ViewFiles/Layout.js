import React, { useEffect } from "react";
import { getFormattedString } from "../../../../../Helper";
import { Box, Paper, Typography } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import FileIcon from "../../../../../assets/File Icon.png";
import { Skeleton } from "@material-ui/lab";
import Moment from "react-moment";
import { fetchProjectFiles } from "../../../../../store/actions";
import {
  selectOurProjectFiles,
  selectStudent
} from "../../../../../store/selectors";
import { useSelector } from "react-redux";
import useStyles from "./Style";
const ViewAllFiles = () => {
  const classes = useStyles();

  const StudentDetails = useSelector(selectStudent);
  const StudentData = { ...StudentDetails.data };
  const projectGroup = { ...StudentData.group };

  useEffect(() => {
    fetchProjectFiles(projectGroup._id);
  }, []);

  const ProjectFilesState = useSelector(selectOurProjectFiles);
  const ViewFiles = ProjectFilesState.data;
  const fileDescription = "File Description here...";

  const foldersColor = [
    "#e53935",
    "#fb8c00",
    "#fdd835",
    "#43a047",
    "#1e88e5",
    "#8e24aa",
    "#d81b60"
  ];

  // TODO: Style this View Files Component
  const RenderViewFiles = () => (
    <Box className={classes.allFiles}>
      {ViewFiles &&
        ViewFiles.map((data, index) => (
          <Box key={data._id} className={classes.files}>
            <Box
              variant="div"
              key={index}
              component={Paper}
              className={classes.uploadedFiles}
            >
              <Box variant="div" className={classes.fileIcon}>
                <a
                  href={data.UploadedFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.fileIconColors}
                >
                  <Typography
                    style={{
                      position: "relative",
                      top: "3.6rem",
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: "1.1rem"
                    }}
                  >
                    {(index += 1)}
                    {}
                  </Typography>
                  <Folder
                    className={classes.icon}
                    style={
                      {
                        // color: `${abcd}`
                      }
                    }
                  />
                </a>
              </Box>
              <Box variant="div">
                {data.Description === "" ? (
                  <Typography
                    className={classes.fileDescription}
                    color="inherit"
                  >
                    {fileDescription}
                  </Typography>
                ) : (
                  <Typography
                    className={classes.fileDescription}
                    color="inherit"
                  >
                    {getFormattedString(data.Description)}
                  </Typography>
                )}
                <Typography className={classes.fileUploadDate}>
                  Uploaded at&nbsp;
                  <span>
                    <Moment format="DD/MM/YYYY">
                      {getFormattedString(data.createdAt)}
                    </Moment>
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );

  return (
    <div>
      <h1>Our Uploaded Files</h1>
      {!ViewFiles ? (
        <Skeleton variant="rect" height={400} animation="wave" />
      ) : (
        RenderViewFiles()
      )}
    </div>
  );
};

export default ViewAllFiles;
