import React, { useEffect, useRef, useState } from 'react';
import styles from './todayDiary.module.css';

import { useLocation, useNavigate } from 'react-router-dom';
import Diary from '../../components/diary/diary';
import MakerModal from '../../components/maker/makerModal';
import MoreViewModal from '../../components/moreViewModal/moreViewModal';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import ConfirmModal from '../../components/confirmModal/confirmModal';

const TodayDiary = ({ diaryRepository, fileUpload }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state;

  const [memory, setMemory] = useState(locationState?.memory);
  const [user, setUser] = useState(locationState?.user);
  const day = locationState?.day;
  const [showModal, setShowModal] = useState({
    edit: false,
    moreView: false,
    delete: false,
  });

  console.log(user);

  //modal 열기
  const openModal = (target) => {
    setShowModal((showModal) => {
      const newModalState = { ...showModal, [target]: true };
      return newModalState;
    });
  };
  //modal 닫기
  const closeModal = (target) => {
    setShowModal((showModal) => {
      const newModalState = { ...showModal, [target]: false };
      return newModalState;
    });
  };

  //일기 작성 시 fireBase 저장
  const onUpdate = (key, value) => {
    const newMemory = { ...memory, [key]: value };
    console.log('newMemory : ', newMemory);
    setMemory(newMemory);
    diaryRepository.saveDiary(user.userId, newMemory, day);
  };

  //일기 삭제
  const onDelete = () => {
    const newMemory = { ...memory };
    if (!newMemory) {
      return;
    }
    for (const key in newMemory) {
      delete newMemory[key];
    }
    setMemory(newMemory);
    diaryRepository.deleteDiary(user.userId, day);
    setShowModal({ edit: false, moreView: false, delete: false });
  };

  const wallpaperIcon = [
    {
      name: '홈',
      src: '/images/homeIcon.svg',
      onClick: () =>
        navigate('/record', { state: { user: { id: user.userId } } }),
    },
    {
      name: '기록하기',
      src: '/images/editIcon.svg',
      onClick: () => openModal('edit'),
    },
    {
      name: '사진 더보기',
      src: `${
        memory && memory.pictures
          ? '/images/moreViewIcon.svg'
          : '/images/moreViewEmpty.svg'
      }`,
      onClick: () => openModal('moreView'),
    },
  ];

  return (
    <section className={styles.todayDiary}>
      {showModal.edit && (
        <MakerModal
          memory={memory}
          updateContent={onUpdate}
          day={day}
          fileUpload={fileUpload}
          onClose={closeModal}
        />
      )}
      {showModal.moreView && (
        <MoreViewModal
          pictures={memory && memory.pictures}
          onClose={closeModal}
          target={'moreView'}
        />
      )}
      {showModal.delete && (
        <ConfirmModal
          message='정말 오늘의 일기를 지울건가요? :('
          onCancel={() => closeModal('delete')}
          onConfirm={onDelete}
        />
      )}
      <WallpaperIcon wallpaperIcon={wallpaperIcon} onModalOpen={openModal} />
      <div
        className={`${styles.diaryWrap} ${
          (showModal.edit || showModal.moreView) && styles.hide
        }`}
      >
        {
          <Diary
            memory={memory}
            day={day}
            onDelete={onDelete}
            showModal={showModal.delete}
            onModalClose={closeModal}
            onModalOpen={openModal}
          />
        }
      </div>
    </section>
  );
};

export default TodayDiary;
