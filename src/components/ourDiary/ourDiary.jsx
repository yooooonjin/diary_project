import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ourDiary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import MoreViewModal from '../moreViewModal/moreViewModal';
import Dots from '../dots/dots';

const OurDiary = ({
  memory,
  day,
  user,
  member,
  openModal,
  showModal,
  closeModal,
  updateContent,
}) => {
  console.log(memory);

  const commentInputRef = useRef();
  const [selectedFriend, setSelectedFriend] = useState('');
  const { contents, pictures, comment } = memory[selectedFriend] || {};
  const [count, setCount] = useState(0);

  //선택된 친구
  const onSelectFriend = (e) => {
    e.preventDefault();
    setSelectedFriend(e.currentTarget.id);
    setCount(0);
  };

  //화면에 보이는 댓글 지정
  const onCount = useCallback((e) => {
    const maxCount = memory[selectedFriend].comment.length;
    if (e.currentTarget.id === 'right') {
      setCount((count) => {
        if (count >= maxCount - 1) return 0;

        return count + 1;
      });
    } else {
      setCount((count) => {
        if (count <= 0) return maxCount - 1;
        return count - 1;
      });
    }
  });

  //댓글달기
  const handleCommentSend = (e) => {
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
      </div>
      <div className={styles.diary_container}>
        <div className={styles.diary}>
          <div className={styles.noteBox}>
            {memory &&
              Object.keys(memory).map((key) => {
                const user = member.find((user) => user.userId === key);
                return (
                  <div
                    onClick={onSelectFriend}
                    className={styles.noteFile}
                    id={key}
                    key={key}
                  >
                    <img
                      className={styles.noteFileImg}
                      src={
                        key === selectedFriend
                          ? `/images/selectNoteFile.svg`
                          : `/images/noteFile.svg`
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
                    openModal('friendPictures');
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
                      onClick={onCount}
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
                      onClick={onCount}
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
            onClose={closeModal}
            target={'friendPictures'}
          />
        )}
      </div>
    </div>
  );
};

export default OurDiary;
