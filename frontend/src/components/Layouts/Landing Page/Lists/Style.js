import { makeStyles } from '@material-ui/core';
import Svg from '../../../.././assets/SVG-Background.png';

const useStyles = makeStyles((theme) => ({
    center: {
    textAlign: 'center',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(10)
  },
  svg: {
    backgroundImage: `URL(${Svg})`,
    height: '100%',
    width: '100%',
  },
  listItem: {
    color: "#666",
  },
  btn: {
    color: "#ffffff",
    backgroundColor: theme.palette.primary.main,
    padding: '0.8rem 1.8rem',
    fontSize: '1.1rem',
    marginTop: '4rem',
    marginBottom: '.3rem',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '5px 10px 20px 1px rgba(27, 94, 32, 0.253)',
    },
  },
  check: {
    color: theme.palette.primary.main,
  }
}));

export default useStyles;