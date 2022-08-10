import React, { useEffect, useRef, useState } from 'react';
import styles from './diary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faSun,
  faCloudSun,
  faCloud,
  faUmbrella,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '../confirmModal/confirmModal';
import Dots from '../dots/dots';
import Button from '../button/button';

const Diary = ({
  memory,
  day,
  onDelete,
  showModal,
  onModalClose,
  onModalOpen,
}) => {
  const {
    weather,
    location,
    title,
    contents,
    compliment,
    regret,
    mainPicture,
  } = memory || {};

  const [shown, setShown] = useState('contents');
  const evaluation = [
    { id: 'contents', txt: '오늘의 기록' },
    { id: 'compliment', txt: '오늘의 칭찬' },
    { id: 'regret', txt: '오늘의 반성' },
  ];

  const onvisibleAreaChange = (e) => {
    const target = e.target.id;
    setShown(target);
  };

  return (
    <section className={styles.diary}>
      <div className={styles.diary_mark}>
        <Dots />
        <div>
          <div className={styles.info}>
            <p className={styles.date}>{day}</p>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.placeIcon}
            />
            <span className={styles.place}>{location || '장소'}</span>
          </div>
        </div>
        <div>
          {
            {
              sun: <FontAwesomeIcon icon={faSun} className={styles.weather} />,
              cloudSun: (
                <FontAwesomeIcon icon={faCloudSun} className={styles.weather} />
              ),
              cloud: (
                <FontAwesomeIcon icon={faCloud} className={styles.weather} />
              ),
              rain: (
                <FontAwesomeIcon icon={faUmbrella} className={styles.weather} />
              ),
              snow: (
                <FontAwesomeIcon
                  icon={faSnowflake}
                  className={styles.weather}
                />
              ),
            }[weather]
          }
        </div>
      </div>
      <div className={styles.mainDiary_container}>
        <div className={styles.wrap}>
          <div
            className={`${styles.mainDiary} ${!mainPicture && styles.single}`}
          >
            {mainPicture && (
              <div className={styles.pictures}>
                <img className={styles.image} src={mainPicture[0]} alt='' />
              </div>
            )}
            <div className={styles.contentsBox}>
              <p className={styles.title}>
                <span>제목 : </span>
                {title || '제목을 입력해주세요.'}
              </p>
              <div className={styles.evaluation_container}>
                {evaluation.map((item, idx) => {
                  return (
                    <p
                      key={idx}
                      onClick={onvisibleAreaChange}
                      id={item.id}
                      className={`${styles.evaluation} ${
                        shown === item.id && styles.selected
                      }`}
                    >
                      {item.txt}
                    </p>
                  );
                })}
              </div>
              {shown === 'contents' && (
                <div className={styles.written}>{contents}</div>
              )}
              {shown === 'compliment' && (
                <div className={styles.written}>{compliment}</div>
              )}
              {shown === 'regret' && (
                <div className={styles.written}>{regret}</div>
              )}
            </div>
          </div>
          <div className={styles.button_container}>
            <Button
              message='일기 지우기'
              onClick={() => onModalOpen('delete')}
              type='button'
              size='0.8em'
              version='line'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diary;
