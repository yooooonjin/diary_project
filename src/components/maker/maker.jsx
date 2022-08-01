import React, { useRef } from 'react';
import ImageUpload from './imageUpload/imageUpload';
import styles from './maker.module.css';
import Weather from './weather/weather';

const Maker = ({ memory, updateContent, isvisible, day, fileUpload }) => {
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
  } = memory || {};

  const onChange = (event) => {
    const newData = { ...memory, [event.target.name]: event.target.value };
    updateContent(newData);
  };

  const onFileChange = (files) => {
    const filesURL = [];
    for (const file of files) {
      filesURL.push(file.url);
    }
    const newData = { ...memory, pictures: filesURL };
    updateContent(newData);
  };
  return (
    <>
      <aside
        className={`${styles.container} ${!isvisible && styles.invisible}`}
      >
        <div className={`${styles.maker} ${!isvisible && styles.invisible}`}>
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
                  value={day}
                  readOnly
                  onChange={onChange}
                />
              </div>
              <div className={`${styles.column} ${styles.weather}`}>
                <Weather weather={weather} onChange={onChange} />
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
                placeholder='장소를 입력해주세요.'
                onChange={onChange}
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
                placeholder='제목을 입력해주세요.'
                onChange={onChange}
              />
            </div>
            <textarea
              className={`${styles.textarea} ${styles.column}`}
              name='contents'
              id='contents'
              value={contents}
              placeholder='일기를 작성해 주세요:)'
              onChange={onChange}
              spellCheck='false'
            ></textarea>
            <div className={styles.rowContent}>
              <div className={styles.column}>
                <p>오늘의 칭찬</p>
                <textarea
                  type='text'
                  className={styles.textarea}
                  name='compliment'
                  id='compliment'
                  value={compliment}
                  placeholder='오늘 잘한일은?'
                  onChange={onChange}
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
                  placeholder='오늘 반성 할 일은?'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={`${styles.column} ${styles.fileUpload} `}>
              <ImageUpload
                fileUpload={fileUpload}
                onFileChange={onFileChange}
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
