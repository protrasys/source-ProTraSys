import { makeStyles } from '@material-ui/core';
import { randomNumber } from 'Helper';

const colors = ['darkblue', 'darkred', 'purple', 'darkgreen'];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    color: '#333333',
    height: '20rem',
    padding: '1rem 0.8rem',
    marginBottom: '4rem',
    transition: '0.35s',
    '&:hover': {
      boxShadow: '5px 10px 20px 1px rgba(67, 160, 71, 0.253)',
      transform: 'scale(1.05)',
      color: '#ffffff',
      backgroundColor: `${colors[randomNumber(0, 3)]}`,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '.5rem',
    },
  },
  heading: {
    color: theme.palette.primary.light,
    letterSpacing: '0.2rem',
    marginBottom: '0.6rem',
  },
  subHeading: {
    fontSize: '1.25rem',
    marginBottom: '0.6rem',
  },
}));

export default useStyles;
