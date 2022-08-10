import React from 'react';
import Button from '../button/button';
import styles from './confirmModal.module.css';

const ConfirmModal = ({ message, onCancel, onConfirm }) => {
  return (
    <>
      <div className={styles.dim}></div>
      <section className={styles.confirmModal}>
        <div>{message}</div>
        <div className={styles.button_container}>
          <Button
            message='취소'
            onClick={onCancel}
            version='line'
            type='button'
          />
          <Button
            message='지우기'
            onClick={onConfirm}
            version='dark'
            type='button'
          />
        </div>
      </section>
    </>
  );
};

export default ConfirmModal;
