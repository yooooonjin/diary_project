import React, { useEffect, useRef, useState } from 'react';
import styles from './calendarMainImg.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const CalendarMainImg = ({ memories, days, onDateClick }) => {
  const dayformat = days.format('YYYY-MM-DD');
  const [URL, setURL] = useState();

  useEffect(() => {
    memories &&
      Object.keys(memories).map((key) => {
        if (key === dayformat) {
          memories[key].mainPicture && setURL(memories[key].mainPicture[0]);
        }
      });
  });

  return (
    <div
      className={styles.images}
      onClick={() => {
        onDateClick(dayformat);
      }}
    >
      {URL && <img className={styles.image} src={`${URL}`} />}
      <div
        className={`${styles.day} ${
          memories && memories[dayformat] && styles.white
        }`}
      >
        {days.format('DD')}
      </div>
      <div>
        {memories && !URL && memories[dayformat] && (
          <>
            <FontAwesomeIcon icon={faFolder} className={styles.folder} />
            <FontAwesomeIcon
              icon={faFolderOpen}
              className={styles.folderOpen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarMainImg;
