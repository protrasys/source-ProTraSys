import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    padding: 0,
    margin: 0,
    flexDirection: 'column',
  },
  progressBar: {
    width: '50%',
    marginBottom: '10px',
    appearance: 'none',
    WebkitAppearance: 'none',
  },
  defaultImage: {
    height: '45%',
    marginBottom: '20px',
  },
  formImage: {
    height: '25%',
  },
  success: {
    backgroundColor: 'green',
  },
  formDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '25%',
  },
}));

export default useStyles;
