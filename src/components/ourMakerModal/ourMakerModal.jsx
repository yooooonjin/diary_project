import React, { useRef, useState } from 'react';
import styles from './ourMakerModal.module.css';
import Button from '../button/button';
import XButton from '../xButton/xButton';
import { closeModal, openModal } from '../../service/modalController';

const OurMakerModal = ({
  updateContent,
  fileUpload,
  setShowModal,
  showModal,
}) => {
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef();
  const fileRef = useRef();

  const onfileUploadBtnClick = (event) => {
    event.preventDefault();
    fileRef.current.click();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(closeModal('edit', showModal));
    if (textareaRef.current.value.trim() === '') return;
    updateContent('contents', textareaRef.current.value);
  };

  const onFileUplaod = async (event) => {
    const key = event.target.id;
    setLoading(true);
    const files = await fileUpload.onUpload(event.target.files);
    setLoading(false);
    onFileChange(files, key);
  };

  const onFileChange = (files, key) => {
    const filesURL = [];
    for (const file of files) {
      filesURL.push(file.url);
    }
    updateContent(key, filesURL);
  };
  return (
    <>
      <section className={styles.makerModal}>
        <div className={styles.makerModal_mark}>
          <p className={styles.markTitle}>오늘의 일기</p>
          <XButton
            version={'beige'}
            onClick={() => {
              setShowModal(closeModal('edit', showModal));
            }}
          />
        </div>
        <div className={styles.maker}>
          <form className={styles.form} action=''>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              placeholder='일기를 작성해 주세요:)'
              spellCheck='false'
            ></textarea>
            <button className={styles.imageUploadBtn}>
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
              <div
                onClick={onfileUploadBtnClick}
                className={`${loading && styles.loading}`}
              >
                사진 업로드
              </div>
            </button>
            <div className={styles.button_container}>
              <Button
                message='지우기'
                onClick={() => setShowModal(openModal('delete', showModal))}
                version='line'
                type='button'
              />
              <Button
                message='저장하기'
                onClick={onSubmit}
                version='dark'
                type='submit'
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default OurMakerModal;
