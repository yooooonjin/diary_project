import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ourTodayDiary.module.css';
import OurDiary from '../../components/ourDiary/ourDiary';
import OurMakerModal from '../../components/ourMakerModal/ourMakerModal';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import ConfirmModal from '../../components/confirmModal/confirmModal';

const OurTodayDiary = ({ diaryRepository, fileUpload }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state;

  const [member, setMember] = useState(locationState?.member);
  const [memory, setMemory] = useState(locationState?.memory);
  const [selectDiary, setSelectDiary] = useState(locationState?.selectDiary);
  const [user, setUser] = useState(locationState?.user);
  const day = locationState?.day;
  const [showModal, setShowModal] = useState({
    edit: false,
    delete: false,
    friendPictures: false,
  });

  console.log(memory);

  const openModal = (target) => {
    setShowModal((showModal) => {
      const newModalState = { ...showModal, [target]: true };
      return newModalState;
    });
  };
  const closeModal = (target) => {
    setShowModal((showModal) => {
      const newModalState = { ...showModal, [target]: false };
      return newModalState;
    });
  };

  //우리의 일기 기록
  const onUpdate = (key, value, selectedFriend) => {
    const selectedUser = selectedFriend ? selectedFriend : user.userId;
    const newMemory = { ...memory[selectedUser], [key]: value };
    setMemory({ ...memory, [selectedUser]: newMemory });
    diaryRepository.saveOurDiary(selectDiary, selectedUser, newMemory, day);
  };

  //나의 기록 삭제
  const onDelete = (e) => {
    e.preventDefault();
    const newMemory = { ...memory };
    console.log(newMemory);
    if (!newMemory[user.userId]) {
      return;
    }
    delete newMemory[user.userId];
    setMemory(newMemory);
    diaryRepository.deleteOurDiary(selectDiary, user.userId, day);
    setShowModal({ edit: false, delete: false });
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
      onClick: () => openModal('edit'),
    },
  ];

  return (
    <section className={styles.ourTodayDiary}>
      <WallpaperIcon wallpaperIcon={wallpaperIcon} onModalOpen={openModal} />
      <div className={styles.ourDiary}>
        <div className={`${showModal.edit && styles.hide}`}>
          <OurDiary
            memory={memory}
            day={day}
            selectDiary={selectDiary}
            user={user}
            member={member}
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
            updateContent={onUpdate}
          />
        </div>
        {showModal.edit && (
          <OurMakerModal
            openModal={openModal}
            closeModal={closeModal}
            fileUpload={fileUpload}
            updateContent={onUpdate}
            onDelete={onDelete}
          />
        )}
        {showModal.delete && (
          <ConfirmModal
            message='정말 오늘의 일기를 지울건가요? :('
            onCancel={() => closeModal('delete')}
            onConfirm={onDelete}
          />
        )}
      </div>
    </section>
  );
};

export default OurTodayDiary;
