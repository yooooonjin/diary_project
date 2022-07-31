import React, { useRef, useState } from 'react';
import styles from './diary.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faSun,
  faCloudSun,
  faCloud,
  faUmbrella,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import Pictures from './pictures/pictures';
import Content from './content/content';

const Diary = ({ memories }) => {
  const {
    id,
    date,
    weather,
    location,
    title,
    contents,
    compliment,
    regret,
    pictures,
  } = memories[0];

  const diaryRef = useRef();
  const stopMotionByWheel = (element) => {
    if (element === 'diary') {
      diaryRef.current.classList.add(`${styles.stop}`);
      setTimeout(() => {
        diaryRef.current.classList.remove(`${styles.stop}`);
      }, 0);
    }
  };

  return (
    <div ref={diaryRef} className={styles.diary}>
      <article className={styles.container}>
        <div>
          <div className={styles.info}>
            <p className={styles.date}>{date}</p>
            <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
            <span className={styles.place}>{location}</span>
          </div>
          <p className={styles.title}>{title}</p>
        </div>
        <div>
          {
            {
              sun: <FontAwesomeIcon icon={faSun} className={styles.weather} />,
              cloudSun: (
                <FontAwesomeIcon icon={faCloudSun} className={styles.weather} />
              ),
              cloud: (
                <FontAwesomeIcon icon={faCloud} className={styles.weather} />
              ),
              rain: (
                <FontAwesomeIcon icon={faUmbrella} className={styles.weather} />
              ),
              snow: (
                <FontAwesomeIcon
                  icon={faSnowflake}
                  className={styles.weather}
                />
              ),
            }[weather]
          }
        </div>
      </article>
      <Pictures images={pictures} stopMotionByWheel={stopMotionByWheel} />
      <Content contents={contents} />
    </div>
  );
};

export default Diary;
