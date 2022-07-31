import React, { useRef, useState } from 'react';
import styles from './memory.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Maker from '../maker/maker';
import Diary from '../diary/diary';
import { useLocation } from 'react-router-dom';

const Memory = () => {
  const location = useLocation();
  const locationState = location?.state;

  const [memory, setMemory] = useState(locationState && locationState.memory);
  const [newMemory, setNewMemory] = useState(locationState.emptyMemory);

  const [isvisible, setIsvisible] = useState(true);

  const onArrowBtnClick = () => {
    isvisible ? setIsvisible(false) : setIsvisible(true);
  };

  const onUpdate = (data, day) => {
    setMemory(() => {
      const newMemory = data[day];
      return newMemory;
    });
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
          memory={memory}
          newMemory={newMemory}
          updateContent={onUpdate}
          isvisible={isvisible}
          day={locationState.day}
        />
      </div>
      <div className={styles.diary}>
        <Diary memory={memory} newMemory={newMemory} day={locationState.day} />
      </div>
    </section>
  );
};

export default Memory;
