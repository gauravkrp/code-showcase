import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import Lottie from 'react-lottie';

const LottieAnim = (props) => {

  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isDomLoaded, setDomLoaded] = useState(false);
  const lottieRef = useRef();
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("enter");
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [controls, inView]);

  const lottieOptions = {
    loop: false,
    autoplay: false,
    renderer: 'svg',
    prerender: true,
    animationData: props.jsonSrc,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    },
    eventListeners: [{ eventName: 'destroy', callback: () => { console.log('lottie removed') } }]
  };

  const lottieAppearVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: {
      opacity: 1,
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      exit="exit"
      variants={lottieAppearVariants}
      className={props.class}
    >
      <div className='bodymovin lokall-anim' ref={lottieRef} >
        {isDomLoaded && (
          <Lottie
            options={lottieOptions}
            height={lottieRef.current.clientHeight}
            width={lottieRef.current.clientWidth}
            isStopped={!isPlaying}
          />
        )}
      </div>
    </motion.div>
  )
}

export default LottieAnim;

LottieAnim.propTypes = {
  jsonSrc: PropTypes.object.isRequired
};