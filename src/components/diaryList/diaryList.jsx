import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './calendar/calendar';
import styles from './diaryList.module.css';

const DiaryList = ({ getMemoryList }) => {
  const [memories, setMemories] = useState({});
  const [emptyMemory, setEmptyMemory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getMemory() {
      const data = await getMemoryList.getMemories();
      const emptyData = await getMemoryList.getEmptyMemory();
      setMemories(data);
      setEmptyMemory(emptyData);
    }
    getMemory();
  });

  const onImageClick = (day) => {
    const memory = memories[day];
    navigate('/memory', { state: { memory, day, emptyMemory } });
  };

  return (
    <section id='diaryList'>
      <div className={styles.diaryList}>
        <Calendar memories={memories} onImageClick={onImageClick} />
      </div>
    </section>
  );
};

export default DiaryList;
