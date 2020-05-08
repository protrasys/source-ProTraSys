import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#444E5D',
    minHeight: '100vh',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Candara',
    padding: '0px 20px',
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: '50px',
  },
  heading: {
    margin: '10px 0px 20px 0px',
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#535d6e',
    padding: theme.spacing(5),
  },
  input: {
    margin: '8px 0px',
    backgroundColor: 'white',
  },
  button: {
    borderRadius: '30px',
    width: '40%',
    margin: '20px 0px',
  },
  center: {
    textAlign: 'center',
  },
  danger: {
    backgroundColor: 'red',
  },
  backToHomeButton: {
    cursor: 'pointer',
  },
}));

export default useStyles;
