import React, { useRef } from 'react';
import styles from './imageUpload.module.css';

const ImageUpload = ({ fileUpload, onFileChange }) => {
  const fileRef = useRef();
  const onBtnClick = (event) => {
    event.preventDefault();
    fileRef.current.click();
  };
  const onFileUplaod = async (event) => {
    const files = await fileUpload.onUpload(event.target.files);
    onFileChange(files);
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
        사진올리기
      </button>
    </>
  );
};

export default ImageUpload;
