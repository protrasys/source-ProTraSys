import { makeStyles } from '@material-ui/core/styles';
import { Copyright, LinearScale } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
  },
  left: {
    textAlignLast: 'left',
    padding: '0 5rem',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1rem',
    },
  },
  heading: {
    marginBottom: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  para: {
    color: theme.palette.primary.light,
  },
  btn: {
    color: theme.palette.primary.main,
    backgroundColor: '#ffffff',
    padding: '.8rem 1.8rem',
    fontSize: '1.1rem',
    marginTop: '4rem',
    marginBottom: '.3rem',
    transition: '.3s',
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '5px 10px 20px 1px rgba(255, 255, 255, .253)',
    },
  },
  divider: {
    backgroundColor: theme.palette.primary.light,
    opacity: '.5',
    margin: '5rem 6rem',
    [theme.breakpoints.down('sm')]: {
      margin: '3rem 3rem',
    },
  },
  icon: {
    fontSize: '1.5rem',
    marginRight: '1.5rem',
    transition: '.50s',
    '&:hover': {
      transform: 'scale(1.5)',
    },
  },
  copyright: {
    color: theme.palette.primary.light,
  },
}));

export default useStyles;
