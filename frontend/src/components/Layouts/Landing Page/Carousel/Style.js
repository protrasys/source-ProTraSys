import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  carouselDivision: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: theme.spacing(20)
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
    width: '70%',
    // height: '97vh'
  }
}));

export default useStyles;
