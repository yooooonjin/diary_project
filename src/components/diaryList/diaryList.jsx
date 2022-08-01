import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from './calendar/calendar';
import styles from './diaryList.module.css';

const DiaryList = ({ getMemoryList, diaryRepository }) => {
  const location = useLocation();
  const locationState = location?.state;
  const [user, setUser] = useState({
    id: locationState.userId,
    name: locationState.userName,
  });
  const [memories, setMemories] = useState({});

  useEffect(() => {
    const stopSync = diaryRepository.syncDiary(user.id, (data) => {
      setMemories(data);
    });
    return () => stopSync();
  }, [diaryRepository, user]);

  return (
    <section id='diaryList'>
      <div className={styles.diaryList}>
        <div>{user.name}의 일기</div>
        <Calendar memories={memories} user={user} />
      </div>
    </section>
  );
};

export default DiaryList;
