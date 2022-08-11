import React from 'react';
import styles from './moreViewModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Pictures from '../pictures/pictures';
import XButton from '../xButton/xButton';

const MoreViewModal = ({ pictures, onClose }) => {
  return (
    <section className={styles.moreViewModal}>
      <XButton onClick={onClose} version={'beige'} marginSize={'1em'} />
      {pictures && <Pictures images={pictures} />}
      {!pictures && (
        <div className={styles.noPicture}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className={styles.error}
          />
          <div>사진을 업로드 해주세요</div>
        </div>
      )}
    </section>
  );
};

export default MoreViewModal;
