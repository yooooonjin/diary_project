import React, { useState } from 'react';
import styles from './calendarFrame.module.css';
import moment from 'moment';
import Calendar from '../calendar/calendar';
import Dots from '../dots/dots';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';
import XButton from '../xButton/xButton';
import Button from '../button/button';

const CalendarFrame = ({
  memories,
  user,
  selectDiary,
  onClose,
  onDeleteOurMemories,
}) => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const navigate = useNavigate();

  //날짜 클릭하면 선택 날짜 일기로 이동
  const onDateClick = (day) => {
    const memory = memories && memories[day] ? memories[day] : {};
    selectDiary
      ? navigate('/ourMemory', {
          state: { memory, day, user, selectDiary, member: memories.member },
        })
      : navigate('/todayDiary', { state: { memory, day, user } });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar_mark}>
        {!onClose && <Dots />}
        {onDeleteOurMemories && (
          <p className={styles.deletOurDiary} onClick={onDeleteOurMemories}>
            일기장 삭제
          </p>
        )}
        <button
          className={styles.button}
          onClick={() => {
            setMoment(getMoment.clone().subtract(1, 'month'));
          }}
        >
          <FontAwesomeIcon icon={faCircleLeft} />
        </button>
        <div className={styles.month}>{today.format('YYYY년 MM월')}</div>
        <button
          className={styles.button}
          onClick={() => {
            setMoment(getMoment.clone().add(1, 'month'));
          }}
        >
          <FontAwesomeIcon icon={faCircleRight} />
        </button>
        {onClose && (
          <XButton
            onClick={() => {
              onClose('ourCalendar');
            }}
          />
        )}
      </div>
      <Calendar today={today} onDateClick={onDateClick} memories={memories} />
    </div>
  );
};

export default CalendarFrame;
