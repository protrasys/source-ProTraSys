import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  allFiles: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  uploadedFiles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 1.4rem 1.2rem 1.4rem',
    borderRadius: '.5rem',
    marginBottom: '1.5rem',
    marginRight: '1.5rem',
    width: '17.5rem',
    boxShadow: '5px 10px 20px 1px rgba(67, 160, 71, 0.123)',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 1.2rem',
      width: '17rem',
    },
  },
  fileIcon: {
    // backgroundColor: theme.palette.primary.main,
    // padding: ".5rem",
    // borderRadius: "50%",
    // height: "3rem",
    // width: "3rem",
    // marginRight: "1rem",
    // boxShadow: "5px 10px 20px 1px rgba(67, 160, 71, 0.153)"
  },
  fileIconColors: {
    textDecoration: 'none',
  },

  icon: {
    fontSize: '5rem',
    transition: '.5rem',
    '&:active': {
      color: '#eee',
      transform: 'scale(.9)',
    },
  },
  fileDescription: {
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: '.3rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.9rem',
      marginBottom: '.2rem',
    },
  },
  fileUploadDate: {
    fontSize: '.8rem',
    textAlign: 'center',
    // marginBottom: "1.5rem",
    color: '#c9c9c9',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.75rem',
    },
  },
}));

export default useStyles;
