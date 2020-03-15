import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: '#d3d3d3',
    color: theme.palette.common.black
  },
  table: {
    minWidth: 700
  },
  iconSpacing: {
    padding: theme.spacing(1)
  },
  delete: {
    marginLeft: theme.spacing(2)
  }
}));

export default useStyles;
