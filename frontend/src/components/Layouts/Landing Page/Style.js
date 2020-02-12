import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
    marginTop: 70
  },
  tagline: {
    color: '#e65100',
    textTransform: 'uppercase',
    fontWeight: 'bolder'
  },
  heading: {
    textTransform: 'capitalize',
    color: '#292F4D',
    fontWeight: '400',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  moto: {
    fontSize: '1.3rem',
    letterSpacing: 2
  },
  signUpButton: {
    padding: theme.spacing(1.5, 5, 1.5, 5),
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
    fontSize: '1.1rem'
  }
}));

export default useStyles;
