import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#d3d3d3',
    color: theme.palette.common.black,
    padding: theme.spacing(3),
    border: '5px solid black',
  },
}));

export default useStyles;
