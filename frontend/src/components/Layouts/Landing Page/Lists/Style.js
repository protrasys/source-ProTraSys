import { makeStyles } from '@material-ui/core';
import Svg from '../../../.././assets/SVG-Background.png';

const useStyles = makeStyles((theme) => ({
    center: {
    textAlign: 'center',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(10),
    // display: 'none'
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    }
  },
  overlay: {
    // backgroundImage: `URL(${Svg})`,
    // backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '80%',
    position: 'absolute',
    top: '240rem',
    left: '0',
    // display:'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  heading: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.65rem',
    }
  },
  listItem: {
    color: "#666",
    padding: '0 4rem',
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    }
  },
  btn: {
    color: "#ffffff",
    backgroundColor: theme.palette.primary.main,
    padding: '0.8rem 1.8rem',
    fontSize: '1.1rem',
    marginTop: '4rem',
    marginBottom: '.3rem',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '5px 10px 20px 1px rgba(27, 94, 32, 0.253)',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    }
  },
  check: {
    color: theme.palette.primary.main,
  }
}));

export default useStyles;