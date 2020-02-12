import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(10)
  },
  tagline: {
    color: '#e65100',
    textTransform: 'uppercase',
    fontWeight: 'bolder'
  },
  heading: {
    textTransform: 'capitalize',
    color: '#292F4D',
    fontWeight: '400',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  moto: {
    fontSize: '1.3rem',
    color: '#292F4D',
    letterSpacing: 2
  },
  signUpButton: {
    padding: theme.spacing(1.5, 3, 1.5, 3),
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: theme.spacing(0.5),
    transition: '0.5s',
    '&:hover': {
      boxShadow: '.2rem .2rem .2rem .2rem #aed581'
    }
  },
  caption: {
    color: '#292F4D'
  },
  carouselDivision: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  carouselBgImage: {
    position: 'absolute',
    zIndex: '1',
    width: '100%'
  },
  carouselItem: {
    zIndex: '-2'
  },
  List: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselInnerImage: {
    width: '70%'
    // height: '100vh'
  }
}));

export default useStyles;
