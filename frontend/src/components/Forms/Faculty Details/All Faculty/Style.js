import { createStyles } from "@material-ui/core/styles";

const useStyles = theme =>
  createStyles({
    root: {},
    heading: {
      color: "#333",
      fontSize: "3rem",
      fontWeight: "400"
    },
    subHeading: {
      color: "#999",
      fontSize: "1rem",
      marginBottom: "1rem"
    },
    name: {
      textTransform: "uppercase",
      letterSpacing: ".1rem",
      color: theme.palette.primary.main
    },
    text: {
      fontSize: "1rem",
      marginBottom: "1.2rem",
      letterSpacing: ".05rem"
    },
    responsiveImg: {
      width: "13rem",
      height: "13rem",
      borderRadius: "50%",
      marginBottom: "1rem"
    },
    card: {
      padding: "1rem 1.6rem",
      margin: "1rem"
    },
    facultyDetails: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItem: "center",
      textAlign: "center"
    },
    btn: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      padding: "1rem 1.6rem",
      transition: ".3s",
      "&:hover": {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        background: "transparent"
      }
    }
  });

export default useStyles;
