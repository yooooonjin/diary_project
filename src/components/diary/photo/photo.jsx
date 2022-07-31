import React, { useEffect, useRef } from 'react';
import styles from './photo.module.css';

const Photo = ({ URL, active, idx, width }) => {
  const location = (width + 1) * (idx - active) - width / 2;
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
