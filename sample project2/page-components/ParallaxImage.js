import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  useViewportScroll,
  motion,
  useTransform,
} from 'framer-motion';
import PropTypes from 'prop-types';

import Image from '../components/Layout/Image';

const ParallaxImage = (props) => {

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { scrollY, scrollYProgress } = useViewportScroll();
  const y2 = useTransform(scrollY, [0, 0.4*vw], [0, -0.32*vw]);

  const ref = useRef();
  const [offsetTop, setOffsetTop] = useState(0);

  const offsetTopFromProps = props.offsetTop ? (props.offsetTop * vw)/1536 : 0.33*vw
  const relativeYFromProps = props.relativeY ? (props.relativeY * vw)/1536 : 0.19*vw

  useEffect(() => {
    if (!ref.current) return null;
    setOffsetTop(ref.current.offsetTop);
  }, [ref]);

  const y = useTransform(scrollY, [offsetTop - offsetTopFromProps, offsetTop + offsetTopFromProps], [0, -relativeYFromProps], [0.42, 0, 0.58, 1], { clamp: false });

  return(
    <motion.div ref={ref} className="px-imgwrap" style={{ y}}>
      <div className="px-imgwrap--img">
        <Image src={props.imgSrc} alt={props.imgAlt} />
      </div>
    </motion.div>
  )
}

export default ParallaxImage;

ParallaxImage.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  offsetTop: PropTypes.number,
  relativeY: PropTypes.number
};
