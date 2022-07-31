import React, { useRef, useState } from 'react';
import styles from './memory.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloudSun,
  faCloud,
  faUmbrella,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

import Maker from '../maker/maker';
import Diary from '../diary/diary';

const Memory = () => {
  const [memories, setMemories] = useState({
    0: {
      id: 0,
      date: '2022-07-23',
      weather: 'sun',
      location: '서울식물원',
      title: '자연과 함께 건강해진 하루 :)',
      contents: '서울 식물원에 다녀왔다.',
      compliment: '청소함',
      regret: '늦잠잠',
      pictures: [
        { URL: '/images/seoulForest (1).jpg' },
        { URL: '/images/seoulForest (2).jpg' },
        { URL: '/images/seoulForest (3).jpg' },
        { URL: '/images/seoulForest (4).jpg' },
      ],
    },
  });

  const [isvisible, setIsvisible] = useState(true);

  const onArrowBtnClick = () => {
    isvisible ? setIsvisible(false) : setIsvisible(true);
  };

  const onUpdate = (updateContent, value, id) => {
    setMemories((memories) => {
      const content = { ...memories[id], [updateContent]: value };
      const newMemories = { ...memories, [id]: content };
      return newMemories;
    });
  };
  return (
    <section className={styles.container}>
      <div className={`${styles.maker} ${!isvisible && styles.invisible}`}>
        <FontAwesomeIcon
          icon='fa-solid fa-circle-chevron-left'
          className={`${styles.arrow} ${!isvisible && styles.close}`}
          onClick={onArrowBtnClick}
        />
        <Maker
          memories={memories}
          updateContent={onUpdate}
          isvisible={isvisible}
        />
      </div>
      <div className={styles.diary}>
        <Diary memories={memories} />
      </div>
    </section>
  );
};

export default Memory;
