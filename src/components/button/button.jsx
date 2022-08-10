import React from 'react';
import styles from './button.module.css';

const Button = ({ message, onClick, version, id, type, size }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(e);
  };
  return (
    <>
      {type === 'button' && (
        <button
          type='button'
          className={`${styles.button} ${version === 'line' && styles.line}`}
          onClick={handleClick}
          id={id && id}
          style={size && { fontSize: `${size}` }}
        >
          {message}
        </button>
      )}
      {type === 'submit' && (
        <button
          type='submit'
          className={`${styles.button} ${version === 'line' && styles.line}`}
          onClick={handleClick}
          id={id && id}
          style={size && { fontSize: `${size}` }}
        >
          {message}
        </button>
      )}
    </>
  );
};

export default Button;
