import { makeStyles } from "@material-ui/core/styles";
import { Copyright, LinearScale } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: "center",
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  },
  left: {
    textAlignLast: "left",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem"
    }
  },
  heading: {
    marginBottom: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem"
    }
  },
  para: {
    color: theme.palette.primary.light,
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem"
    }
  },
  btn: {
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff",
    padding: ".8rem 1.8rem",
    fontSize: "1.1rem",
    marginTop: "4rem",
    marginBottom: ".3rem",
    transition: ".3s",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "5px 10px 20px 1px rgba(255, 255, 255, .253)"
    },
    [theme.breakpoints.down("sm")]: {
      padding: ".7rem 1.4rem",
      fontSize: "1rem",
      marginTop: "3rem"
    }
  },
  divider: {
    backgroundColor: theme.palette.primary.light,
    opacity: ".5",
    margin: "5rem 6rem",
    [theme.breakpoints.down("sm")]: {
      margin: "3rem 1.5rem"
    }
  },
  img: {
    width: "4.3rem",
    [theme.breakpoints.down("sm")]: {
      width: "2.1rem"
    }
  },
  icon: {
    color: "#fff",
    textDecoration: "none",
    marginRight: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: "1rem"
    }
  },
  copyright: {
    color: theme.palette.primary.light,
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem"
    }
  }
}));

export default useStyles;
