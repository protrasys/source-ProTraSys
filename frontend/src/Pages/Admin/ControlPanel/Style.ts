import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  textinput: {
    transition: theme.transitions.create('width'),
    width: '25ch',
    [theme.breakpoints.up('md')]: {
      width: '35ch',
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    transition: '0.5s',
    backgroundColor: '#2C4FF0',
    color: theme.palette.common.white,
  },
  chargingDrawerPaper: {
    width: drawerWidth,
    // background: 'linear-gradient(to right, #11998e, #38ef7d)',
    background: '#11998e',
    transition: '0.5s',
    color: theme.palette.common.white,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItem: {
    minWidth: '35px',
    color: 'white',
  },
  batteryStatus: {
    padding: theme.spacing(3),
  },
  chargingStatus: {
    display: 'flex',
  },
  modalStyle: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  search: {},
}));

export default useStyles;
