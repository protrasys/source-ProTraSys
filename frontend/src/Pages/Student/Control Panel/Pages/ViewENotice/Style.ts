import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  notices: {
    boxShadow: '5px 10px 20px 1px rgba(67, 160, 71, 0.123)',
    marginBottom: '1.5rem',
    borderRadius: '.5rem',
    width: '24.05rem',
    marginRight: '1.5rem',
  },
  notice: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1.6rem 1.8rem',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  noticeIcon: {
    backgroundColor: theme.palette.primary.main,
    padding: '.615rem',
    borderRadius: '50%',
    height: '3.2rem',
    width: '3.2rem',
    marginRight: '1.4rem',
    marginBottom: '1.2rem',
    boxShadow: '5px 10px 20px 1px rgba(67, 160, 71, 0.153)',
    flexWrap: 'wrap',
  },
  icon: {
    fontSize: '2rem',
    color: '#fff',
    transition: '.5rem',
    '&:active': {
      color: '#eee',
      transform: 'scale(.9)',
    },
  },
  mobileInfo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  noticeTitle: {
    fontSize: '1.4rem',
    fontWeight: 500,
    marginBottom: '.3rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
  },
  desktopInfo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  noticeDescription: {
    fontSize: '.9rem',
    color: '#999',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.7rem',
    },
  },
  noticeOtherDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.2rem 1.4rem',
  },
  detail: {
    fontSize: '.8rem',
    color: '#999',
  },
}));

export default useStyles;
