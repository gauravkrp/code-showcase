import React, { useState, useCallback, useEffect } from "react"
import { withRouter } from 'next/router'
import PropTypes from "prop-types"
import styles from './modal.module.scss'

const Modal = (props:any) => {

  const onClose = () => {
    console.log('closing modal')
    props.onClose()
    document.body.classList.remove('of-h')
  }
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      onClose();
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)    
    //props.show ? document.body.classList.add('of-h') : document.body.classList.remove('of-h')
    return () => {
      document.removeEventListener("keydown", escFunction, false)
      document.body.classList.remove('of-h')
    };
  }, [])

  if (!props.show) {
    return null
  }
  else {
    document.body.classList.add('of-h')
    return (
      <div id={props.modalId ? props.modalId : 'modal'} className={`modalWrapper ${props.type ? ` ${props.type}` : ''}${styles.modalWrapper}` } role="button"
        //onClick={onClose}
      >
        <div 
          className={`${styles.appModalInnerWrap} ${props.show ? ` ${styles.modalShown}` : ''} ${props.size === 'large' ? ` ${styles.fullHeight}` : ''}`} 
          onClick={e => e.stopPropagation()} 
        >
          <button type='button' className={`close-btn ${styles.modalClose}`} onClick={onClose}>
            <img src='/assets/svg/cross.svg' />
          </button>
          <div className={styles.modalBody}>
            <div className={styles.modalContent}>{props.children}</div>
          </div>
        </div>
      </div>
    )
  }

}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
export default withRouter(Modal);
