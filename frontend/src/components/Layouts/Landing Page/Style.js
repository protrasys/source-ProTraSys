import { makeStyles } from '@material-ui/core';
import Svg from '../../.././assets/SVG-Background.png';

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
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    transition: '0.5s',
    '&:hover': {
      boxShadow: '.2rem .2rem .2rem .2rem #aed581',
      transform: 'scale(1.05)',
      backgroundColor: theme.palette.primary.dark,
    },
  },
  svg: {
    backgroundImage: `URL(${Svg})`,
    // backgroundSize: 'cover',
    height: '100%',
    width: '100%',
  },
  listItem: {
    color: "#666",
  },
  btn: {
    borderColor: theme.palette.primary.main,
    color: "#ffffff",
    backgroundColor: theme.palette.primary.main,
    padding: '0.8rem 1.8rem',
    fontSize: '1.1rem',
    marginTop: '4rem',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '5px 10px 20px 1px rgba(27, 94, 32, 0.253)',
    },
  },
  check: {
    color: theme.palette.primary.main,
  }
}));

export default useStyles;
