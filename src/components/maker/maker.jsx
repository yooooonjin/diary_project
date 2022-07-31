import React, { useRef } from 'react';
import styles from './maker.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloudSun,
  faCloud,
  faUmbrella,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

const Maker = ({ memories, updateContent, isvisible }) => {
  const {
    id,
    date,
    weather,
    location,
    title,
    contents,
    compliment,
    regret,
    pictures,
  } = memories[0];
  const handleUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    updateContent(name, value, id);
  };
  return (
    <>
      <aside
        className={`${styles.container} ${!isvisible && styles.invisible}`}
      >
        <div className={`${styles.maker} ${!isvisible && styles.invisible}`}>
          {/* <h1 className={styles.makerTitle}>My today is...</h1> */}
          <form className={styles.form} action=''>
            <div className={styles.subtitle}>오늘의 일기</div>
            <div className={styles.rowContent}>
              <div className={`${styles.column}`}>
                <p>날짜</p>
                <input
                  className={styles.input}
                  type='date'
                  name='date'
                  id='date'
                  value={date}
                  onChange={handleUpdate}
                />
              </div>
              <div className={`${styles.column} ${styles.weather}`}>
                <input
                  className={`${styles.input}`}
                  type='radio'
                  name='weather'
                  id='sun'
                  value='sun'
                  defaultChecked='checked'
                  onChange={handleUpdate}
                />
                <label htmlFor='sun'>
                  <FontAwesomeIcon
                    icon={faSun}
                    className={styles.weatherIcon}
                  />
                </label>
                <input
                  className={`${styles.input}`}
                  type='radio'
                  name='weather'
                  id='cloudSun'
                  value='cloudSun'
                  onChange={handleUpdate}
                />
                <label htmlFor='cloudSun'>
                  <FontAwesomeIcon
                    icon={faCloudSun}
                    className={styles.weatherIcon}
                  />
                </label>
                <input
                  className={`${styles.input}`}
                  type='radio'
                  name='weather'
                  id='cloud'
                  value='cloud'
                  onChange={handleUpdate}
                />
                <label htmlFor='cloud'>
                  <FontAwesomeIcon
                    icon={faCloud}
                    className={styles.weatherIcon}
                  />
                </label>
                <input
                  className={`${styles.input}`}
                  type='radio'
                  name='weather'
                  id='rain'
                  value='rain'
                  onChange={handleUpdate}
                />
                <label htmlFor='rain'>
                  <FontAwesomeIcon
                    icon={faUmbrella}
                    className={styles.weatherIcon}
                  />
                </label>
                <input
                  className={`${styles.input}`}
                  type='radio'
                  name='weather'
                  id='snow'
                  value='snow'
                  onChange={handleUpdate}
                />
                <label htmlFor='snow'>
                  <FontAwesomeIcon
                    icon={faSnowflake}
                    className={styles.weatherIcon}
                  />
                </label>
              </div>
            </div>
            <div className={`${styles.column} ${styles.row}`}>
              <p className={styles.dateTitle}>장소 : </p>
              <input
                className={`${styles.input} ${styles.title}`}
                type='text'
                name='location'
                id='location'
                value={location}
                onChange={handleUpdate}
              />
            </div>
            <div className={`${styles.column} ${styles.row}`}>
              <p className={styles.dateTitle}>제목 : </p>
              <input
                className={`${styles.input} ${styles.title}`}
                type='text'
                name='title'
                id='title'
                value={title}
                onChange={handleUpdate}
              />
            </div>
            <textarea
              className={`${styles.textarea} ${styles.column}`}
              name='contents'
              id='contents'
              value={contents}
              onChange={handleUpdate}
              spellCheck='false'
            ></textarea>
            <div className={styles.rowContent}>
              <div className={styles.column}>
                <p>오늘 잘한 일</p>
                <textarea
                  type='text'
                  className={styles.textarea}
                  name='compliment'
                  id='compliment'
                  value={compliment}
                  onChange={handleUpdate}
                />
              </div>
              <div className={styles.column}>
                <p>오늘의 반성</p>
                <textarea
                  type='text'
                  className={styles.textarea}
                  name='regret'
                  id='regret'
                  value={regret}
                  onChange={handleUpdate}
                />
              </div>
            </div>
            <div className={`${styles.column} ${styles.row}`}>
              <input
                type='text'
                name='photo'
                id='photo'
                className={styles.input}
              />
            </div>
          </form>
          <p className={styles.rights}>2022 YoonJin - All rights reserved</p>
        </div>
      </aside>
    </>
  );
};

export default Maker;
