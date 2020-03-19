import React, { useEffect } from "react";
import useStyles from "./Style";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { GetAllStudents } from "../../../../../store/actions";
import { selectAllStudents } from "../../../../../store/selectors";
import { getFormattedString } from "../../../../../Helper";
import Moment from "react-moment";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const AllStudents = () => {
  const classes = useStyles();
  useEffect(() => {
    GetAllStudents();
  }, []);

  // Retrieving Student Data from Redux
  const AllStudentsState = useSelector(selectAllStudents);
  const StudentsData = AllStudentsState.data;
  const isDataLoading = AllStudentsState.loading;

  const RenderAllStudents = () => {
    return (
      <Box component="div">
        <TableContainer container>
          <Table
            stickyHeader="true"
            aria-label="sticky table"
            style={{ textAlign: "center" }}
          >
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.heading}>Sr. No.</TableCell>
                <TableCell className={classes.heading}>Name</TableCell>
                <TableCell className={classes.heading}>Sem</TableCell>
                <TableCell className={classes.heading}>Enrollment ID</TableCell>
                <TableCell className={classes.heading}>Email</TableCell>
                <TableCell className={classes.heading}>Phone</TableCell>
                <TableCell className={classes.heading}>Project Name</TableCell>
                <TableCell className={classes.heading}>Update</TableCell>
                <TableCell className={classes.heading}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {StudentsData &&
                StudentsData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.studentData}>
                      {getFormattedString(index + 1)}
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      {getFormattedString(data.name)}
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      {getFormattedString(data.sem)}
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      {getFormattedString(data.enrollmentId)}
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      {getFormattedString(data.email)}
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      {getFormattedString(data.phone)}
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      {data.projectGroupId
                        ? getFormattedString(data.projectGroupId.projectName)
                        : "N/A"}
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      <Edit color="primary" />
                    </TableCell>
                    <TableCell className={classes.studentData}>
                      <Delete style={{ color: "#d50000" }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return isDataLoading ? (
    <Skeleton variant="rect" animation="wave" height={500} />
  ) : (
    <div>
      <h1>Get All Students</h1>
      {RenderAllStudents()}
    </div>
  );
};

export default AllStudents;
