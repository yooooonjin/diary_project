import React, { useEffect, useState } from 'react';
import styles from './todayDiary.module.css';

import { useLocation, useNavigate } from 'react-router-dom';
import Diary from '../../components/diary/diary';
import MakerModal from '../../components/maker/makerModal';
import MoreViewModal from '../../components/moreViewModal/moreViewModal';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import ConfirmModal from '../../components/confirmModal/confirmModal';
import { closeModal, openModal } from '../../service/modalController';

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
    diary: true,
  });

  useEffect(() => {
    console.log('user : ', user);
    console.log('사용자 아니면 퇴장');
    !user.userId && navigate('/');
  }, [user]);

  //일기 작성 시 fireBase 저장
  const onUpdate = (key, value) => {
    console.log('일기저장');
    const newMemory = { ...memory, [key]: value };
    setMemory(newMemory);
    diaryRepository.saveDiary(user.userId, newMemory, day);
  };

  //일기 삭제
  const onDelete = () => {
    console.log('일기삭제');
    const newMemory = { ...memory };
    if (!newMemory) {
      return;
    }
    for (const key in newMemory) {
      delete newMemory[key];
    }
    setMemory(newMemory);
    diaryRepository.deleteDiary(user.userId, day);
    setShowModal({ edit: false, moreView: false, delete: false, diary: true });
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
      onClick: () => setShowModal(openModal('edit', showModal)),
    },
    {
      name: '사진 더보기',
      src: `${
        memory && memory.pictures
          ? '/images/moreViewIcon.svg'
          : '/images/moreViewEmpty.svg'
      }`,
      onClick: () => setShowModal(openModal('moreView', showModal)),
    },
  ];

  const noteIcon = [
    {
      name: '오늘의일기',
      src: '/images/noteIcon.svg',
      onClick: () => setShowModal(openModal('diary', showModal)),
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
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {showModal.moreView && (
        <MoreViewModal
          pictures={memory && memory.pictures}
          onClose={() => {
            setShowModal(closeModal('moreView', showModal));
          }}
        />
      )}
      {showModal.delete && (
        <ConfirmModal
          message='정말 오늘의 일기를 지울건가요? :('
          onCancel={() => setShowModal(closeModal('delete', showModal))}
          onConfirm={onDelete}
        />
      )}
      <div
        className={`${
          (showModal.edit ||
            showModal.moreView ||
            showModal.delete ||
            showModal.diary) &&
          styles.hide
        }`}
      >
        <WallpaperIcon wallpaperIcon={wallpaperIcon} />
        <div className={styles.pcHide}>
          <WallpaperIcon wallpaperIcon={noteIcon} location='right' />
        </div>
      </div>
      <div
        className={`${styles.diaryWrap} ${
          (showModal.edit || showModal.moreView) && styles.hide
        }`}
      >
        {showModal.diary && (
          <Diary
            memory={memory}
            day={day}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </section>
  );
};

export default TodayDiary;
