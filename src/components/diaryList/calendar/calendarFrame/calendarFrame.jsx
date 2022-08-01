import React, { useEffect } from 'react';
import styles from './calendarFrame.module.css';
import moment, { months } from 'moment';
import Images from '../../images/images';

const CalendarFrame = ({ today, onImageClick, memories }) => {
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
    <table className={styles.table}>
      <tbody className={styles.tbody}>{calendarArr()}</tbody>
    </table>
  );
};

export default CalendarFrame;
