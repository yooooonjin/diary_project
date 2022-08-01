import React, { useRef, useState } from 'react';
import styles from './memory.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Maker from '../maker/maker';
import Diary from '../diary/diary';
import { useLocation } from 'react-router-dom';

const Memory = ({ diaryRepository, fileUpload }) => {
  const location = useLocation();
  const locationState = location?.state;

  const [memories, setMemories] = useState(
    locationState && locationState.memories
  );
  const [user, setUser] = useState(locationState.user);

  const [isvisible, setIsvisible] = useState(true);

  const onArrowBtnClick = () => {
    isvisible ? setIsvisible(false) : setIsvisible(true);
  };

  const onUpdate = (data) => {
    setMemories((memories) => {
      const newMemory = { ...memories, [locationState.day]: data };
      return newMemory;
    });
    diaryRepository.saveDiary(user.id, data, locationState.day);
  };
  return (
    <section className={styles.container}>
      <div className={`${styles.maker} ${!isvisible && styles.invisible}`}>
        <FontAwesomeIcon
          icon={faCircleChevronLeft}
          className={`${styles.arrow} ${!isvisible && styles.close}`}
          onClick={onArrowBtnClick}
        />
        <Maker
          memory={memories && memories[locationState.day]}
          updateContent={onUpdate}
          isvisible={isvisible}
          day={locationState.day}
          fileUpload={fileUpload}
        />
      </div>
      <div className={styles.diary}>
        <Diary
          memory={memories && memories[locationState.day]}
          day={locationState.day}
        />
      </div>
    </section>
  );
};

export default Memory;
