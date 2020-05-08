import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    padding: '.8rem 1rem',
  },
  cardContent: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  facultyInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItem: 'center',
    textAlign: 'center',
    width: '18rem',
    borderRight: '1px solid #333',
    paddingRight: '2rem',
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
      paddingRight: '0',
    },
  },
  profileImg: {
    width: '8rem',
    height: '8rem',
    borderRadius: '50%',
    backgroundColor: '#eee',
    padding: '.4rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  facultyName: {
    fontSize: '1.3rem',
    fontWeight: '400',
    marginBottom: '.5rem',
  },
  facultyDesignation: {
    fontSize: '.8rem',
    fontWeight: 'lighter',
    color: '#999',
    marginBottom: '2rem',
  },
  facultyDates: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '.8rem',
    fontWeight: 'lighter',
    marginBottom: '1rem',
  },
  btn: {
    padding: '.8rem 1.4rem',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    marginBottom: '1rem',
    transition: '.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '.6rem 1.2rem',
    },
  },
  heading: {
    marginBottom: '.5rem',
    fontSize: '.9rem',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  FacultySkills: {
    border: '1px solid #777',
    padding: '.6rem .8rem',
    borderRadius: '.15rem',
    fontWeight: '100',
    fontSize: '.9rem',
    marginRight: '.8rem',
    marginBottom: '.8rem',
  },
}));

export default useStyles;
