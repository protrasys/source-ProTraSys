import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  listStyling: {
    listStyle: "none",
    backgroundColor: theme.palette.primary.main,
    padding: "1rem",
    borderRadius: ".3rem",
    color: "#fff"
  },
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8rem",
    borderRadius: 2,
    fontSize: "2rem",
    border: "2px dashed #cccccc",
    backgroundColor: "#ffffff",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
  },
  uploadForm: {
    display: "block"
  },
  List: {
    textDecoration: "none"
  },
  success: {
    backgroundColor: "green"
  },
  customFileInput: {
    outline: "none",
    "&::-webkit-file-upload-button": {
      visibility: "hidden"
    },
    "&::before": {
      content: "'Choose Files'",
      display: "inline-block",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      padding: "1rem 1.6rem",
      borderRadius: ".25rem",
      outline: "none",
      whiteSpace: "nowrap",
      cursor: "pointer",
      fontSize: ".85rem",
      fontWeight: "bold",
      letterSpacing: ".1rem",
      marginLeft: "3rem",
      textTransform: "uppercase",
      textAlign: "center",
      transition: ".5s"
    },
    "&:active::before": {
      backgroundColor: theme.palette.primary.dark
    },
    "&:hover::before": {
      boxShadow: "5px 10px 20px 1px rgba(67, 160, 71, 0.253)"
    }
  },
  uploadBtn: {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: ".8rem 1.6rem",
    boxShadow: "none",
    transition: ".4s",
    "&:hover": {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      boxShadow: "5px 10px 20px 1px rgba(67, 160, 71, 0.253)"
    }
  },
  downloadBtn: {
    padding: ".8rem 1.6rem",
    marginRight: "1rem",
    boxShadow: "5px 10px 20px 1px rgba(67, 160, 71, 0.253)",
    transition: ".4s",
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`
    }
  }
}));

export default useStyles;
