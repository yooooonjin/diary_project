import React, { useRef, useState } from 'react';
import styles from './makerModal.module.css';
import ImageUpload from '../imageUpload/imageUpload';
import Weather from '../weather/weather';
import Button from '../button/button';
import XButton from '../xButton/xButton';
import { closeModal } from '../../service/modalController';

const MakerModal = ({
  memory,
  updateContent,
  day,
  fileUpload,
  showModal,
  setShowModal,
}) => {
  const {
    weather,
    location,
    title,
    contents,
    compliment,
    regret,
    mainPicture,
  } = memory || {};

  const [mainloading, setMainLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const makerRef = useRef();
  const makerBackRef = useRef();
  const mainFileRef = useRef();

  // 일기 수정
  const onChange = (event) => {
    const key =
      event.target.name === 'weather' ? event.target.name : event.target.id;
    const value = event.target.value;
    updateContent(key, value);
  };

  //메인 파일 업로드 버튼 클릭
  const onMainFileAdd = (event) => {
    event.preventDefault();
    mainFileRef.current.click();
  };

  //파일 업로드
  const onFileUplaod = async (event) => {
    const key = event.target.id;
    key === 'mainPicture' ? setMainLoading(true) : setLoading(true);
    const files = await fileUpload.onUpload(event.target.files);
    key === 'mainPicture' ? setMainLoading(false) : setLoading(false);
    onFileChange(files, key);
  };

  //파일 다시 업로드시
  const onFileChange = (files, key) => {
    const filesURL = [];
    for (const file of files) {
      filesURL.push(file.url);
    }
    updateContent(key, filesURL);
  };
  /////////////////////////////////////////////////

  //모달창 이동
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();

  const onMouseDown = (e) => {
    setIsMoving(true);
    setPosX(e.clientX);
    setPosY(e.clientY);
  };

  const onMouseMove = (e) => {
    const backBottom = makerBackRef.current.getBoundingClientRect().bottom;
    const backRight = makerBackRef.current.getBoundingClientRect().right;
    const makerTop = makerRef.current.getBoundingClientRect().top;
    const makerLeft = makerRef.current.getBoundingClientRect().left;

    if (isMoving) {
      makerRef.current.style.transform = `translate(${
        makerLeft + e.clientX - posX < 0 || backRight < makerLeft
          ? 0
          : makerLeft + e.clientX - posX
      }px,${
        makerTop + e.clientY - posY < 0 || backBottom < makerTop
          ? 0
          : makerTop + e.clientY - posY
      }px)`;

      setPosX(e.clientX);
      setPosY(e.clientY);
    }
  };

  const onMouseUp = () => {
    setIsMoving(false);
  };
  return (
    <div className={styles.makerModalWrap}>
      <div
        ref={makerBackRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className={styles.makerModalBack}
      ></div>
      <section
        ref={makerRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className={styles.makerModal}
      >
        <div className={styles.makerModal_mark} onMouseDown={onMouseDown}>
          <p className={styles.markTitle}>오늘의 일기</p>
          <XButton
            onClick={() => {
              setShowModal(closeModal('edit', showModal));
            }}
            version={'beige'}
          />
        </div>
        <div className={styles.maker}>
          <form className={styles.form} action=''>
            <div className={styles.rowContent}>
              <div className={`${styles.column}`}>
                <p>날짜</p>
                <input
                  className={styles.input}
                  type='date'
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
                id='title'
                value={title}
                placeholder='제목을 입력해주세요.'
                onChange={onChange}
              />
            </div>
            <textarea
              className={`${styles.textarea} ${styles.column}`}
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
                  id='regret'
                  value={regret}
                  placeholder='오늘 반성 할 일은?'
                  onChange={onChange}
                />
              </div>
            </div>
            <div
              className={`${styles.column} ${styles.mainFileUpload} ${
                !mainPicture && styles.darkVer
              }`}
            >
              <input
                className={styles.mainFileInput}
                ref={mainFileRef}
                type='file'
                id='mainPicture'
                accept='image/*'
                onChange={onFileUplaod}
              />
              <button
                className={styles.mainfileUploadBtn}
                onClick={onMainFileAdd}
              >
                {mainloading && <div className={styles.loading}></div>}
                {!mainloading &&
                  (mainPicture ? '메인 사진 수정' : '메인 사진 추가')}
              </button>
            </div>
          </form>
          <div className={styles.button_container}>
            <ImageUpload onFileUplaod={onFileUplaod} loading={loading} />
            <Button
              message='확인'
              onClick={() => {
                setShowModal(closeModal('edit', showModal));
              }}
              version='dark'
              type='submit'
              size='0.8em'
            />
          </div>
          <p className={`${styles.guide} ${styles.hide}`}>
            창을 드래그 하여 위치를 이동할 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MakerModal;
