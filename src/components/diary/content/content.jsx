import React from 'react';
import styles from './content.module.css';

const Content = ({ contents }) => {
  const letters = contents.split('');
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
