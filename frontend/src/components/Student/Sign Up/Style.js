import { createStyles } from "@material-ui/core/styles";

const useStyles = theme =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5)
    },
    card: {
      width: "38rem",
      padding: "2rem",
      borderRadius: "1rem",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: "1rem"
      }
    },
    textField: {
      marginBottom: "1rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem"
      }
    },
    btn: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      padding: "1rem 1.6rem",
      transition: ".3s",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: "5px 10px 20px 1px rgba(67, 160, 71, 0.253)"
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: ".5rem .8rem",
        marginBottom: ".5rem"
      }
    },
    signIn: {
      color: theme.palette.primary.main
    },
    link: {
      color: theme.palette.primary.dark,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    }
  });

export default useStyles;
