import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ourTodayDiary.module.css';
import OurDiary from '../../components/ourDiary/ourDiary';
import OurMakerModal from '../../components/ourMakerModal/ourMakerModal';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import ConfirmModal from '../../components/confirmModal/confirmModal';
import { closeModal, openModal } from '../../service/modalController';

const OurTodayDiary = ({ diaryRepository, fileUpload }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state;

  const [member, setMember] = useState(locationState?.member);
  const [memory, setMemory] = useState(locationState?.memory);
  const [selectDiary, setSelectDiary] = useState(locationState?.selectDiary);
  const [user, setUser] = useState(locationState?.user);
  const day = locationState?.day;

  const [selectedFriend, setSelectedFriend] = useState('');
  const [count, setCount] = useState(0);

  const [showModal, setShowModal] = useState({
    edit: false,
    delete: false,
    friendPictures: false,
    ourDiary: true,
  });

  console.log(showModal);
  //우리의 일기 기록
  const onUpdate = (key, value, selectedFriend) => {
    console.log('우리의 일기 기록');
    const selectedUser = selectedFriend ? selectedFriend : user.userId;
    const newMemory = { ...memory[selectedUser], [key]: value };
    setMemory({ ...memory, [selectedUser]: newMemory });
    diaryRepository.saveOurDiary(selectDiary, selectedUser, newMemory, day);
  };

  //나의 기록 삭제
  const onDelete = (e) => {
    console.log('나의 기록 삭제');

    e.preventDefault();
    const newMemory = { ...memory };
    if (!newMemory[user.userId]) {
      return;
    }
    delete newMemory[user.userId];
    setMemory(newMemory);
    diaryRepository.deleteMyDiaryInOurs(selectDiary, user.userId, day);
    setShowModal({
      edit: false,
      delete: false,
      friendPictures: false,
      ourDiary: true,
    });

    if (user.userId === selectedFriend) setSelectedFriend('');
  };

  //선택된 친구
  const onSelectFriend = (e) => {
    console.log('선택된 친구');
    e.preventDefault();
    setSelectedFriend(e.currentTarget.id);
    setCount(0);
  };

  //화면에 보이는 댓글 지정
  const onCount = (target) => {
    console.log('화면에 보이는 댓글 지정');
    const maxCount = memory[selectedFriend].comment.length;
    if (target === 'right') {
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
  };

  const wallpaperIcon = [
    {
      name: '우리의 이야기 홈',
      src: '/images/homeIcon.svg',
      onClick: () => navigate('/ours', { state: { user } }),
    },
    {
      name: '나의 하루',
      src: '/images/editIcon.svg',
      onClick: () => setShowModal(openModal('edit', showModal)),
    },
  ];

  const noteIcon = [
    {
      name: '오늘의일기',
      src: '/images/noteIcon.svg',
      onClick: () => setShowModal(openModal('ourDiary', showModal)),
    },
  ];

  return (
    <section className={styles.ourTodayDiary}>
      <div
        className={`${
          (showModal.edit ||
            showModal.friendPictures ||
            showModal.delete ||
            showModal.ourDiary) &&
          styles.hide
        }`}
      >
        <WallpaperIcon wallpaperIcon={wallpaperIcon} />
        <div className={styles.pcHide}>
          <WallpaperIcon wallpaperIcon={noteIcon} location='right' />
        </div>
      </div>
      <div className={styles.ourDiary}>
        <div className={`${showModal.edit && styles.hide}`}>
          {showModal.ourDiary && (
            <OurDiary
              memory={memory}
              day={day}
              selectDiary={selectDiary}
              user={user}
              member={member}
              updateContent={onUpdate}
              showModal={showModal}
              setShowModal={setShowModal}
              selectedFriend={selectedFriend}
              selectFriend={onSelectFriend}
              count={count}
              calCount={onCount}
            />
          )}
        </div>
        {showModal.edit && (
          <OurMakerModal
            fileUpload={fileUpload}
            updateContent={onUpdate}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        {showModal.delete && (
          <ConfirmModal
            message='정말 오늘의 일기를 지울건가요? :('
            onCancel={() => setShowModal(closeModal('delete', showModal))}
            onConfirm={onDelete}
          />
        )}
      </div>
    </section>
  );
};

export default OurTodayDiary;
