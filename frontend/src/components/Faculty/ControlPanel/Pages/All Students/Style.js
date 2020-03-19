import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: "center",
    color: "#333",
    backgroundColor: "#eee"
  },
  studentData: {
    textAlign: "center"
  },
  table: {
    minWidth: 700
  },
  iconSpacing: {
    padding: theme.spacing(1)
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  Form: {
    display: 'block',
    padding: theme.spacing(5)
  },
  margin: {
    margin: '.2rem'
  },
  success: {
    backgroundColor: 'green'
  },
  danger: {
    backgroundColor: 'red'
  }
}));

export default useStyles;
