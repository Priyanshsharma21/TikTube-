import React from 'react';
import Masonry from 'react-masonry-css';
import {motion} from 'framer-motion'
import { Card, Col } from 'antd';
import { Link } from 'react-router-dom';
import demo from '../assets/pexels-marek-mucha-13339565.jpg'
import millify from 'millify';

const { Meta } = Card;

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MLayout = ({ homeVideos }) => (
  <motion.div
   whileInView={{ opacity: [0, 1] }}
  transition={{ duration:0.5, type: 'tween' }}
  >
    <Masonry style={{display:'flex'}} className="flex animate-slide-fwd  dark:bg-slate-800" breakpointCols={breakpointColumnsObj}>
   
    </Masonry>
  </motion.div>
);

export default MLayout;