import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './calendar/calendar';
import styles from './diaryList.module.css';

const DiaryList = ({ getMemoryList }) => {
  const [memories, setMemories] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getMemory() {
      const data = await getMemoryList.getMemories();
      setMemories(data);
    }
    getMemory();
  });

  const onImageClick = () => {
    console.log('맞나?');
    navigate('/memory');
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
