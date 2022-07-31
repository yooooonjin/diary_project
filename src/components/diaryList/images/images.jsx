import React, { useEffect, useRef, useState } from 'react';
import styles from './images.module.css';

const Images = ({ memories, days, onImageClick }) => {
  const [URL, setURL] = useState();

  useEffect(() => {
    Object.keys(memories).map((key) => {
      if (key === days.format('YYYY-MM-DD')) {
        setURL(memories[key].pictures[0].URL);
      }
    });
  });

  return (
    <div className={styles.images} onClick={onImageClick}>
      {URL && (
        <img
          data-date={days.format('YYYY-MM-DD')}
          className={styles.image}
          src={`${URL}`}
        />
      )}
      <div className={`${styles.day} ${URL && styles.white}`}>
        {days.format('DD')}
      </div>
    </div>
  );
};

export default Images;
