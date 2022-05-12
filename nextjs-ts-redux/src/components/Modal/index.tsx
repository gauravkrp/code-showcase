/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect } from 'react';

import Image from '../Image';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';
import { withRouter } from 'next/router';

const Modal: React.FC<any> = ({ modalId, type, size, onClose, show, children }) => {
  const onModalClose = useCallback(() => {
    console.log('closing modal');
    onClose();
    document.body.classList.remove('of-h');
  }, [onClose]);

  const escFunction = useCallback(
    (event:any) => {
      if (event.keyCode === 27) {
        onModalClose();
      }
    },
    [onModalClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    //props.show ? document.body.classList.add('of-h') : document.body.classList.remove('of-h')
    return () => {
      document.removeEventListener('keydown', escFunction, false);
      document.body.classList.remove('of-h');
    };
  }, [escFunction]);

  if (!show) {
    return null;
  } else {
    document.body.classList.add('of-h');
    return (
      <div
        id={modalId ? modalId : 'modal'}
        className={`modalWrapper ${type ? ` ${type}` : ''}${styles.modalWrapper}`}
        role="button"
        //onClick={onClose}
      >
        <div
          className={`${styles.appModalInnerWrap} ${show ? ` ${styles.modalShown}` : ''} ${
            size === 'large' ? ` ${styles.fullHeight}` : ''
          }`}
          onClick={e => e.stopPropagation()}
        >
          <button type="button" className={`close-btn ${styles.modalClose}`} onClick={onClose}>
            <Image src="/assets/svg/cross.svg" />
          </button>
          <div className={styles.modalBody}>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default withRouter(Modal);
