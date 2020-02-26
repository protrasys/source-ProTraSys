import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    main: {
        padding: '5rem',
        [theme.breakpoints.down('sm')]: {
            padding: '.5rem',
        }
    },
    title: {
        color: theme.palette.primary.main,
        letterSpacing: '0.2rem',
        marginBottom: '0.3rem',
        textTransform: 'uppercase',
    },
    heading: {
        color: '#212121',
        marginBottom: '1.3rem',
        fontSize: '2.8rem',
    },
    paragraph: {
        marginBottom: '1rem',
    },
    listItem: {
        marginBottom: '1rem',
    },
    check: {
        color: theme.palette.primary.main,
    },
    btn: {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        padding: '0.7rem 1.6rem',
        transition: '0.3s',
        '&:hover': {
            color: '#ffffff',
            backgroundColor: theme.palette.primary.main,
            boxShadow: '5px 10px 20px 1px rgba(67, 160, 71, 0.253)',
        }
    }
}));

export default useStyles;