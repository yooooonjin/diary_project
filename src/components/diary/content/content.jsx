import React from 'react';
import styles from './content.module.css';

const Content = ({ contents }) => {
  const diaryContents = contents || '일기를 작성해 주세요:)';
  const letters = diaryContents && diaryContents.split('');
  return (
    <div className={styles.contens_cotainer}>
      <ul className={styles.contents}>
        {letters.map((letter, idx) => (
          <li className={styles.text} key={idx}>
            {letter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
