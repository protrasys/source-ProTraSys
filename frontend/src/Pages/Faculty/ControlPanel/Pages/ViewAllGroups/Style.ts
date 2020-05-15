import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: '2rem',
  },
  allStudent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  student: {
    width: '17rem',
    margin: '0 .5rem',
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: '.1rem',
    marginBottom: '.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  group: {
    fontSize: '1rem',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '.6rem 1rem',
    borderRadius: '.2rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  projectDetails: {
    marginBottom: '1rem',
    padding: '0 1rem',
  },
  individualStudentDetails: {
    marginTop: '.5rem',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '.6rem 1rem',
    borderRadius: '.2rem',
    marginBottom: '.5rem',
  },
  detail: {
    fontSize: '.8rem',
  },
  head: {
    fontSize: '.9rem',
    fontWeight: 500,
    marginTop: '.5rem',
  },
}));

export default useStyles;
