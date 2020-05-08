import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 50,
  },
  cardContent: {
    textAlign: 'center',
    padding: theme.spacing(5),
  },
  forgotLinkText: {
    fontWeight: 'bolder',
    fontSize: 14,
    textAlign: 'left',
  },
  Link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  Caption: {
    textAlign: 'left',
    fontSize: 14,
    marginTop: theme.spacing(3),
  },
  cardAction: {
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  submitButton: {
    width: 100,
    '&:hover': {
      boxShadow: '.1rem .1rem .1rem .1rem #aed581',
    },
  },
  IconButton: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  IconEnrollment: {
    border: '.5px solid black',
    backgroundColor: '#EAF0F1',
    borderRadius: '5%',
    padding: 5,
    maxWidth: 'inherit',
    display: 'flex',
  },
  FormControl: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      minWidth: '50vw',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '60vw',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '30vw',
    },
  },
}));

export default useStyles;
