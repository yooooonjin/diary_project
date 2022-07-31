import React, { useEffect, useRef, useState } from 'react';
import styles from './pictures.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Photo from '../photo/photo';

const Pictures = ({ images, stopMotionByWheel }) => {
  const PHOTO_WIDTH = 20;
  const [active, setActive] = useState(0);
  const count = images.length;

  const handleWheel = (event) => {
    if (event.deltaY > 0 && active < count - 1) {
      setActive((i) => i + 1);
    } else if (event.deltaY < 0 && active > 0) {
      setActive((i) => i - 1);
    }
    stopMotionByWheel('diary');
  };

  return (
    <>
      <div className={styles.container}>
        {active > 0 && (
          <button
            className={`${styles.nav} ${styles.left}`}
            onClick={() => setActive((i) => i - 1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} className={styles.icon} />
          </button>
        )}
        <div className={styles.pictures_container} onWheel={handleWheel}>
          <div className={styles.pictures}>
            {images.map((image, idx) => (
              <Photo
                key={idx}
                URL={image.URL}
                active={active}
                idx={idx}
                width={PHOTO_WIDTH}
              />
            ))}
          </div>
        </div>
        {active < count - 1 && (
          <button
            className={`${styles.nav} ${styles.right}`}
            onClick={() => setActive((i) => i + 1)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        )}
      </div>
      {count > 2 && (
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${(100 / count) * (active + 1)}%` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Pictures;
