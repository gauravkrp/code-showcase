import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView, InView } from 'react-intersection-observer';

import Image from '../components/Layout/Image';

const ScrollSlider = props => {
  const circleSvgRef = useRef(null);
  const [ref, inView] = useInView();
  const [activeNav, setActiveNav] = useState(1);
  const [progressBar, setProgressBar] = useState(1);
  const [count, setCount] = useState(0);
  const progressBarRef = useRef(null);
  const progressBarLabelRef = useRef(null);
  const progressBarDragRef = useRef(null);
  const [tX, setTX] = useState(0);

  useEffect(() => {
    setTX(progressBarRef.current.clientWidth);
  })

  const navLabels = ["Residents", "Visitors", "Investors"];

  const parentVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const slideContentVariant = {
    isShown: {
      y: 0,
      opacity: 1,
      visibility: "visible",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
        delay: 1.8,
      }
    },
    notShown: {
      y: 50,
      opacity: 0,
      visibility: "hidden",
      transition: {
        delay: 1.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      }
    }
  };

  return(
    <InView 
      as="div" 
      triggerOnce 
      onChange={(inView, entry) => { /* console.log('Inview:', inView) */ }}>
      <div className="lokall-scrollSlider horizontal-slider" ref={ref}>
        <div className='scrollSlider-header'>
          <div className="custom-container">
            <ul className={`scrollSlider-nav${count === 1 ? ` inView`: ''}`}>
              {navLabels.map((navLabel, i) => {
                let t = i+1;
                return (
                  <li
                    key={`navLabel${t}`}
                    className={`scrollSlider-navItem${activeNav === t ? ' active' : ''}`}
                    onClick={() => { setActiveNav(t); setProgressBar(t);}}
                  >
                    <button type="button">{navLabel}</button>
                    <motion.div
                      drag={true}
                      dragElastic={0.9}
                      dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                    > 
                      {i === 0 && (
                        <span
                          className="dragger"
                          style={{
                            transform: `translate3d(${(tX / 2) * (activeNav - 1)}px, 0, 0)`
                          }}>
                        </span>
                      )}
                      <svg height="100%" width="100%">
                        <circle 
                          cx="50%" cy="50%" r="46%"
                          stroke={activeNav === t ? 'transparent' : 'transparent'} 
                          strokeWidth="2" 
                          fill={activeNav === t ? 'transparent' : 'transparent'} // white
                        />
                      </svg>
                    </motion.div>
                  </li>
                )
              })}
            </ul>
            <div 
              className={`progress${progressBar === 2 ? ' half-fill' : ''}${progressBar === 3 ? ' full-fill' : ''}`} 
              role="progressbar" aria-valuemin="0" aria-valuemax="100" 
              ref={progressBarRef}
            >
              <motion.span
                className="dragger"
                ref={progressBarDragRef}
                drag={true}
                dragConstraints={progressBarRef}
              ></motion.span>
              <span className="slider__label sr-only" ref={progressBarLabelRef}></span>
            </div>
          </div>
        </div>
        <div className='scrollSlider-body'>
          {slideContents.map((slide, j)=> {
            let z = j+1;
            return(
              <motion.div 
                key={`slideContent${z}`}
                className={`scrollSlider-slide${activeNav === z ? ' active' : ''}`}
                initial={false}
                animate={activeNav === z ? "isShown" : "notShown"}
                variants={{...slideContentVariant, ...parentVariants}}
                //exit="notShown"
              >
                <motion.div className="content-box" variants={slideContentVariant}>
                  <motion.h2>{slide.heading}</motion.h2>
                  <motion.div>
                    <p className="body-text">
                      {slide.text}
                    </p>
                  </motion.div>
                </motion.div>
                <motion.div className="image-1 img-right">
                  <Image src={slide.image1Src} />
                </motion.div>
                <motion.div className="image-2 img-left">
                  <Image src={slide.image2Src} className="parallax-images" />
                </motion.div>
              </motion.div>
            )
          })}        
        </div>
      </div>
    </InView>
  )
}

export default ScrollSlider;