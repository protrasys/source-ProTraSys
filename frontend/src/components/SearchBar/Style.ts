import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  inputBox: {
    backgroundColor: 'rgba(127,127,127,0.1)',
    height: theme.spacing(4),
    width: theme.spacing(25),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    transition: '.3s',
    border: '0.5px solid grey',
    '&:hover': {
      border: '0.5px solid grey',
      backgroundColor: 'white',
    },
    '&:focus': {
      border: '0.5px solid grey',
      width: theme.spacing(30),
      outline: 'none',
    },
  },
  SearchBox: {
    display: 'flex',
    border: '0.5px solid grey',
    borderLeft: 'none',
    justifyContent: 'center',
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    cursor: 'pointer',
    width: theme.spacing(8),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  SearchIcon: {
    color: 'white',
    zoom: 0.8,
  },
}));

export default useStyles;
