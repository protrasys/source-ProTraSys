import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  Card: {},
  CardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    textAlign: "center"
  },
  profile: {
    width: "8rem",
    border: "1px solid #555",
    borderRadius: "50%",
    padding: ".5rem"
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "400"
  },
  designation: {
    fontSize: ".8rem",
    fontWeight: "300",
    color: "#777",
    marginBottom: "1rem"
  },
  skills: {
    backgroundColor: "#333",
    textAlign: "left",
    color: "#fff",
    padding: ".8rem 1.2rem"
  },
  skillsHeading: {
    marginBottom: ".5rem",
    fontSize: ".9rem",
    fontWeight: "400",
    textTransform: "uppercase"
  },
  IndividualSkills: {
    border: "1px solid #777",
    padding: ".6rem .8rem",
    borderRadius: ".15rem",
    fontWeight: "100",
    fontSize: ".9rem",
    marginRight: ".8rem",
    marginBottom: ".8rem"
  },
  aboutFaculty: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: ".85rem",
    margin: ".5rem 0 .5rem 0"
  }
}));
export default useStyles;
