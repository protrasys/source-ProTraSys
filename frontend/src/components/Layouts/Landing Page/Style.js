import { makeStyles, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(10)
  },
  tagline: {
    color: '#e65100',
    textTransform: 'uppercase',
    fontWeight: 'bolder'
  },
  heading: {
    textTransform: 'capitalize',
    fontWeight: '400',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  moto: {
    fontSize: '1.3rem',
    letterSpacing: 2
  },
  signUpButton: {
    padding: theme.spacing(1.5, 3, 1.5, 3),
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: theme.spacing(0.5),
    transition: '0.5s',
    '&:hover': {
      boxShadow: '.2rem .2rem .2rem .2rem #aed581'
    },
  },
  root: {
    backgroundColor: '#388e3c',
    color: '#ffffff',
    transition: '0.5s',
    '&:hover': {
      boxShadow: '.2rem .2rem .2rem .2rem #aed581',
      transform: 'scale(1.05)',
      backgroundColor: '#1b5e20',
    },
  },
}));

export default useStyles;
