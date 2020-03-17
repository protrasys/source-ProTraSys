import React, { useEffect } from "react";
import useStyles from "./Style";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { GetAllStudents } from "../../../../../store/actions";
import { selectAllStudents } from "../../../../../store/selectors";
import { getFormattedString } from "../../../../../Helper";
import Moment from "react-moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid
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
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <Grid container>
                  <Grid item xs={1}>
                    <TableCell>Sr. No. </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Name </TableCell>
                  </Grid>
                  <Grid item xs={1}>
                    <TableCell>Sem </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Enrollment ID </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Phone </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell>Project Name </TableCell>
                  </Grid>
                  <Grid item xs={2}>
                    <TableCell> Update & Delete </TableCell>
                  </Grid>
                </Grid>
              </TableRow>
            </TableHead>
            <TableBody>
              {StudentsData &&
                StudentsData.map((data, index) => (
                  <TableRow key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <TableCell> {getFormattedString(index + 1)} </TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell> {getFormattedString(data.name)} </TableCell>
                      </Grid>
                      <Grid item xs={1}>
                        <TableCell>{getFormattedString(data.sem)}</TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell>
                          {getFormattedString(data.enrollmentId)}
                        </TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell>{getFormattedString(data.phone)}</TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell></TableCell>
                      </Grid>
                      <Grid item xs={2}>
                        <TableCell>
                          <div className={classes.iconSpacing}>
                            <Edit color="primary" />
                            <Delete color="error" />
                          </div>
                        </TableCell>
                      </Grid>
                    </Grid>
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
