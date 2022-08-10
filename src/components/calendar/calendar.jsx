import React from 'react';
import styles from './calendar.module.css';
import moment from 'moment';
import Images from '../calendarMainImg/calendarMainImg';

const Calendar = ({ today, onDateClick, memories }) => {
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
                    onDateClick={onDateClick}
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
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.day}>
          <td>일</td>
          <td>월</td>
          <td>화</td>
          <td>수</td>
          <td>목</td>
          <td>금</td>
          <td>토</td>
        </tr>
        {calendarArr()}
      </tbody>
    </table>
  );
};

export default Calendar;
