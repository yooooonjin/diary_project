import React from 'react';
import styles from './dots.module.css';

const Dots = React.memo(() => {
  return (
    <ul className={styles.dots}>
      <li className={styles.dot}></li>
      <li className={styles.dot}></li>
      <li className={styles.dot}></li>
    </ul>
  );
});

export default Dots;
