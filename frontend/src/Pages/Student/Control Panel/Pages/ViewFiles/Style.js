import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: '#d3d3d3',
    color: theme.palette.common.white,
  },
  table: {
    minWidth: 700,
  },
}));

export default useStyles;
