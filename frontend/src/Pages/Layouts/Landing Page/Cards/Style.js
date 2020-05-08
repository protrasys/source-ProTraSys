import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    color: '#333333',
    height: '20rem',
    padding: '1rem 0.8rem',
    marginBottom: '4rem',
    transition: '0.35s',
    '&:hover': {
      boxShadow: '5px 10px 20px 1px rgba(67, 160, 71, 0.253);',
      transform: 'scale(1.05)',
      color: '#ffffff',
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '.5rem',
    },
  },
  heading: {
    letterSpacing: '0.2rem',
    marginBottom: '0.6rem',
  },
  subHeading: {
    fontSize: '1.25rem',
    marginBottom: '0.6rem',
    color: theme.palette.primary.light,
  },
}));

export default useStyles;
