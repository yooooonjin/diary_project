import React, { useRef } from 'react';
import styles from './ourDiary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { closeModal, openModal } from '../../service/modalController';
import MoreViewModal from '../moreViewModal/moreViewModal';
import XButton from '../xButton/xButton';
import Dots from '../dots/dots';

const OurDiary = ({
  memory,
  day,
  user,
  member,
  updateContent,
  setShowModal,
  showModal,
  selectedFriend,
  selectFriend,
  count,
  calCount,
}) => {
  console.log('memory : ', memory);
  console.log(Object.keys(memory).length);

  const commentInputRef = useRef();
  const { contents, pictures, comment } = memory[selectedFriend] || {};

  const handleCalCount = (e) => {
    const target = e.target.id;
    calCount(target);
  };

  //댓글달기
  const handleCommentSend = (e) => {
    console.log('댓글달기');
    e.preventDefault();
    const commentTxt = `${user.userName} : ${commentInputRef.current.value}`;
    const newComment = comment ? comment : [];
    newComment.push({ id: user.userId, comment: commentTxt });
    updateContent('comment', newComment, selectedFriend);
    commentInputRef.current.value = '';
  };

  return (
    <div className={styles.folder}>
      <div className={styles.folder_mark}>
        <Dots />
        <div>
          <div className={styles.info}>
            <p className={styles.date}>{day}</p>
          </div>
        </div>
        <div className={styles.pcHide}>
          <XButton
            onClick={() => {
              setShowModal(closeModal('ourDiary', showModal));
            }}
          />
        </div>
      </div>
      <div className={styles.diary_container}>
        {Object.keys(memory).length <= 0 && (
          <div className={styles.emptyTxt}>너의 하루는 어땠어?</div>
        )}
        <div className={styles.diary}>
          <div className={styles.noteBox}>
            {memory &&
              Object.keys(memory).map((key) => {
                const user = member.find((user) => user.userId === key);
                return (
                  <div
                    onClick={selectFriend}
                    className={styles.noteFile}
                    id={key}
                    key={key}
                  >
                    <img
                      className={styles.noteFileImg}
                      src={
                        key === selectedFriend
                          ? process.env.PUBLIC_URL +
                            `/images/selectNoteFile.svg`
                          : process.env.PUBLIC_URL + `/images/noteFile.svg`
                      }
                    />
                    <p className={styles.noteFileDesc}>
                      {user.userName}의 하루
                    </p>
                  </div>
                );
              })}
          </div>
          {selectedFriend && (
            <div className={styles.friendDiaryBox}>
              {pictures && (
                <div
                  onClick={() => {
                    setShowModal(openModal('friendPictures', showModal));
                  }}
                  className={styles.morePictures}
                >
                  사진 보기
                </div>
              )}
              <div className={styles.friendDiary}>{contents}</div>
              {comment && (
                <div className={styles.commentBox}>
                  {comment.length > 1 && (
                    <FontAwesomeIcon
                      id='left'
                      onClick={handleCalCount}
                      icon={faCircleLeft}
                      className={styles.arrow}
                    />
                  )}
                  <div className={styles.commentText}>
                    {comment[count].comment}
                  </div>
                  {comment.length > 1 && (
                    <FontAwesomeIcon
                      id='right'
                      onClick={handleCalCount}
                      icon={faCircleRight}
                      className={styles.arrow}
                    />
                  )}
                </div>
              )}
              <form className={styles.comment}>
                <input
                  ref={commentInputRef}
                  className={styles.commentInput}
                  type='text'
                  placeholder='댓글을 적어주세요.'
                />
                <button
                  onClick={handleCommentSend}
                  className={styles.commentBtn}
                >
                  전송
                </button>
              </form>
            </div>
          )}
        </div>
        {showModal.friendPictures && (
          <MoreViewModal
            pictures={pictures}
            onClose={() =>
              setShowModal(closeModal('friendPictures', showModal))
            }
          />
        )}
      </div>
    </div>
  );
};

export default OurDiary;
