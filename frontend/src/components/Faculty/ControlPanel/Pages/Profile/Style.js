import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flex: "1"
  },
  card: {
    padding: "1rem"
  },
  cardContent: {
    display: "flex",
    flexDirection: "row"
  },
  Img: {
    width: "15rem",
    height: "15rem",
    borderRadius: ".2rem",
    marginRight: "1.5rem"
  },
  Name: {
    fontSize: "1.7rem",
    fontWeight: "500",
    // textTransform: "uppercase",
    letterSpacing: ".1rem",
    marginBottom: "0"
  },
  designation: {
    marginBottom: "2rem"
  },
  About: {
    fontSize: "1.2rem",
    fontWeight: "500",
    borderBottom: "1px solid #ccc",
    marginBottom: ".5rem"
  },
  aboutFaculty: {},
  Dates: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "1rem"
  }
}));

export default useStyles;
