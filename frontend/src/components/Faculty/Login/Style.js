import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  Card: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '80vw'
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '70vw'
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '40vw'
    },
    borderRadius: 15
  },
  logo: {
    height: 50
  },
  cardContent: {
    textAlign: 'center',
    padding: theme.spacing(5)
  },
  forgotLinkText: {
    fontWeight: 'bolder',
    fontSize: 14,
    textAlign: 'left'
  },
  Link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  Caption: {
    textAlign: 'left',
    fontSize: 14,
    marginTop: theme.spacing(3)
  }
}));

export default useStyles;
