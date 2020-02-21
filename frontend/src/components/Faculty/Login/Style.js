import { createStyles } from '@material-ui/core/styles';

const useStyles = (theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2)
    },
    Card: {
      margin: 0,
      position: 'absolute',
      [theme.breakpoints.down('sm')]: {
        minWidth: '60vw',
        top: '10%'
      },
      [theme.breakpoints.up('md')]: {
        minWidth: '70vw',
        top: '10%'
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: '40vw',
        top: '10%'
      },
      borderRadius: 15
    }
  });

export default useStyles;
