import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2rem 2.5rem 1rem 2.5rem",
    [theme.breakpoints.down("xs")]: {
      padding: "2rem 2rem 1rem 2rem"
    }
  },
  userName: {
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem"
    }
  },
  heading: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    letterSpacing: ".1rem",
    marginBottom: ".5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  },
  head: {
    fontSize: ".9rem",
    fontWeight: "500"
    // marginRight: "1rem",
    // marginLeft: "1rem"
  },
  detail: {
    fontSize: ".8rem"
  },
  allDetail: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "1rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  allDetails: {
    padding: ".5rem 1rem"
  },
  student: {
    width: "16rem",
    margin: "0 .5rem",
    padding: ".5rem"
  },
  individualStudentDetails: {
    marginTop: ".5rem",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: ".6rem 1rem",
    borderRadius: ".2rem",
    marginBottom: ".5rem"
  },
  img: {
    height: "2.5rem",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      height: "5rem"
    }
  }
}));

export default useStyles;
