import React, { useState } from 'react';
import styles from './calendar.module.css';
import moment, { months } from 'moment';
import Images from '../images/images';

const Calendar = ({ memories, onImageClick }) => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  const calendarArr = () => {
    const result = [];
    const week = firstWeek;
    for (let i = week; i <= lastWeek; i++) {
      result.push(
        <tr key={i}>
          {Array(7)
            .fill(0)
            .map((_, index) => {
              const days = today
                .clone()
                .startOf('year')
                .week(i)
                .startOf('week')
                .add(index, 'day');

              return (
                <td
                  className={`${styles.td} ${
                    moment().format('YYYYMMDD') === days.format('YYYYMMDD') &&
                    styles.today
                  }
                    ${
                      days.format('MM') !== today.format('MM') &&
                      styles.disabled
                    }`}
                  key={index}
                >
                  <Images
                    key={index}
                    memories={memories}
                    days={days}
                    onImageClick={onImageClick}
                  />
                </td>
              );
            })}
        </tr>
      );
    }

    return result;
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
      <table className={styles.table}>
        <tbody className={styles.tbody}>{calendarArr()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
