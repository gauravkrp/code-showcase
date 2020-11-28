import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';

import { randomStr } from '../lib/helper-fxn';

const WordAnim = (props) => {

  const { text, miniText, textTag, tagClassName } = props;
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const words = text.split(' ');

  const transition = { duration: 0.7, ease: [0.6, 0.01, -0.05, 0.9] };   //Ease
  const sentenceVariants = {
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const wordVariants = {
    initial: {
      y: 200,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { ...transition, duration: 0.8 },
    },
  };

  const miniTextVariants = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { ...transition, duration: 2 },
    },
  }

  useEffect(() => {
    if (inView) controls.start("animate");
  }, [controls, inView]);

  let mymotion = {
    tag: textTag ? motion[`${textTag}`] : motion.div
  };

  const [isDomLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  

  return (
    <>
    {isDomLoaded && (
      <mymotion.tag
        ref={ref}
        variants={sentenceVariants}
        initial="initial"
        animate={controls}
        className={`wordAnim${tagClassName ? ` ${tagClassName}`:""}`}
      >
        {
          miniText &&
          <div style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              data-text={miniText}
              className="mini-text"
              variants={miniTextVariants}
            >
              {miniText}
            </motion.span>
          </div>
        }
        {words.map((text, i) => (
          <div key={`word-${randomStr}-${i}`} style={{display: 'inline-block', overflow: 'hidden'}}>
            <motion.span variants={wordVariants} >
              {text}
            </motion.span>
          </div>
        ))}
      </mymotion.tag>
    )}
    </>
  );
}

export default WordAnim;

WordAnim.propTypes = {
  text: PropTypes.string.isRequired,
  miniText: PropTypes.string,
  textTag: PropTypes.string,
  tagClassName: PropTypes.string
};