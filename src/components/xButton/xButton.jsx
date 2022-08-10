import React from 'react';
import styles from './xButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const XButton = ({ onClick, version, marginSize }) => {
  return (
    <FontAwesomeIcon
      icon={faCircleXmark}
      className={`${styles.xmark} ${version === 'beige' && styles.beige}`}
      onClick={onClick}
      style={marginSize && { marginTop: `${marginSize}` }}
    />
  );
};

export default XButton;
