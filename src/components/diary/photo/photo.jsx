import React, { useEffect, useRef } from 'react';
import styles from './photo.module.css';

const Photo = ({ URL, active, idx }) => {
  const PHOTO_WIDTH = 20;
  const location = (PHOTO_WIDTH + 1) * (idx - active) - PHOTO_WIDTH / 2;
  const imgRef = useRef();
  return (
    <div>
      <div
        className={`${styles.photo} ${idx === active && styles.activePhoto}`}
        style={{
          '--index': location,
        }}
      >
        <img
          ref={imgRef}
          // className={`${styles.photo} ${idx === active && styles.activePhoto}`}
          src={`${URL}`}
          alt=''
          style={{
            '--index': location,
          }}
        />
      </div>
    </div>
  );
};

export default Photo;
