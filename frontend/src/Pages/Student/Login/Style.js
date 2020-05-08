import { createStyles } from '@material-ui/core/styles';

const useStyles = (theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: theme.spacing(5),
      justifyContent: 'center',
    },
    Card: {
      minWidth: '40vw',
      [theme.breakpoints.down('sm')]: {
        minWidth: '60vw',
        top: '10%',
      },
      [theme.breakpoints.up('md')]: {
        minWidth: '70vw',
        top: '10%',
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: '40vw',
        top: '10%',
      },
      borderRadius: 15,
    },
  });

export default useStyles;
