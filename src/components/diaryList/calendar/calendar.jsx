import React, { useState } from 'react';
import styles from './calendar.module.css';
import moment, { months } from 'moment';
import Images from '../images/images';
import CalendarFrame from './calendarFrame/calendarFrame';
import { useNavigate } from 'react-router-dom';

const Calendar = ({ memories, user }) => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const navigate = useNavigate();

  const onImageClick = (day) => {
    navigate('/memory', { state: { memories, day, user } });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar_mark}>
        <button
          className={styles.button}
          onClick={() => {
            setMoment(getMoment.clone().subtract(1, 'month'));
          }}
        >
          이전달
        </button>
        <div className={styles.month}>{today.format('YYYY년 MM월')}</div>
        <button
          className={styles.button}
          onClick={() => {
            setMoment(getMoment.clone().add(1, 'month'));
          }}
        >
          다음달
        </button>
      </div>
      <CalendarFrame
        today={today}
        onImageClick={onImageClick}
        memories={memories}
      />
    </div>
  );
};

export default Calendar;
