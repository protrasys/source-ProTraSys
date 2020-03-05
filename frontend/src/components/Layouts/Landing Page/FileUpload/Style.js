import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listStyling: {
        listStyle: 'none',
        backgroundColor: theme.palette.primary.main,
        padding: '1rem',
        borderRadius: '.3rem',
        color: '#fff',
    },
    dropzone: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8rem',
        borderRadius: 2,
        fontSize: '2rem',
        border: '2px dashed #cccccc',
        backgroundColor: '#ffffff',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    },

    
}));

export default useStyles;
