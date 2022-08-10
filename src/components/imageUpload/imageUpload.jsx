import React, { useRef } from 'react';
import styles from './imageUpload.module.css';

const ImageUpload = ({ onFileUplaod, loading }) => {
  const fileRef = useRef();
  const onBtnClick = (event) => {
    event.preventDefault();
    fileRef.current.click();
  };
  return (
    <>
      <input
        className={styles.input}
        ref={fileRef}
        type='file'
        name='pictures'
        id='pictures'
        accept='image/*'
        onChange={onFileUplaod}
        multiple
      />
      <button className={styles.fileUpload} onClick={onBtnClick}>
        <div className={`${loading && styles.loading}`}>사진 업로드</div>
      </button>
    </>
  );
};

export default ImageUpload;
