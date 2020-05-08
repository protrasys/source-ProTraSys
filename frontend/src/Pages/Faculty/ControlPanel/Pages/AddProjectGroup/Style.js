import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
  card: {
    width: '36rem',
    padding: '1.6rem',
  },
  img: {
    width: '3rem',
    marginBottom: '1rem',
  },
  text: {
    marginBottom: '1rem',
  },
  formControl: {
    marginBottom: '1rem',
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    padding: '1rem 1.6rem',
    color: '#fff',
    transition: '.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '5px 10px 20px 1px rgba(67, 160, 71, 0.253)',
    },
  },
}));

export default useStyles;
