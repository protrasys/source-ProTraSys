import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 200
  },
  padding: {
    paddingRight: 20,
    cursor: 'pointer'
  },
  sideBarIcon: {
    padding: 0,
    cursor: 'pointer'
  }
}));

export default useStyles;
