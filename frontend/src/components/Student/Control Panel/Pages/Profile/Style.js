import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.dark
  },
  whiteFont: {
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  },
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  table: {
    minWidth: 700
  },
  right: {
    textAlign: 'right'
  }
}));

export default useStyles;
