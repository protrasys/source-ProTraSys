import React from 'react';
import BGForCarousel from '../../../../assets/BG for Carousel.png';
import Pic2 from '../../../../assets/pic (2).jpg';
import Pic1 from '../../../../assets/pic (1).jpg';
import Pic3 from '../../../../assets/pic (3).jpg';
import Pic4 from '../../../../assets/pic (4).jpg';
import useStyles from './Style';
import { List, Box } from '@material-ui/core';
import ReactCarousel from 'react-material-ui-carousel';

const Carousel = () => {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.carouselDivision}>
      <img className={classes.carouselBgImage} alt='' src={BGForCarousel} />
      <Box component='div'>
        <ReactCarousel
          autoPlay={true}
          interval={5000}
          indicators={false}
          animation='slide'
          className={classes.carouselItem}
        >
          <List className={classes.List}>
            <img src={Pic1} alt='' className={classes.carouselInnerImage} />
          </List>
          <List className={classes.List}>
            <img src={Pic2} alt='' className={classes.carouselInnerImage} />
          </List>
          <List className={classes.List}>
            <img src={Pic3} alt='' className={classes.carouselInnerImage} />
          </List>
          <List className={classes.List}>
            <img src={Pic4} alt='' className={classes.carouselInnerImage} />
          </List>
        </ReactCarousel>
      </Box>
    </Box>
  );
};
export default Carousel;
