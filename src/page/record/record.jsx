import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/confirmModal/confirmModal';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import styles from './record.module.css';
import CalendarFrame from '../../components/calendarFrame/calendarFrame';
import { closeModal, openModal } from '../../service/modalController';

const Record = ({ diaryRepository, userRepository, auth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateUserId = location?.state.user.id;

  const [user, setUser] = useState();
  const [memories, setMemories] = useState({});
  const [showModal, setShowModal] = useState({ delete: false, calendar: true });

  //인증
  useEffect(() => {
    console.log(user);
    console.log('본인인증');
    auth.authChange((user) => {
      !user && navigate('/');
    });
  }, [user, auth]);

  //사용자 정보 가져오기
  useEffect(() => {
    console.log('사용자 정보가져옴');
    const stopSync = userRepository.syncUser(stateUserId, (userInfo) => {
      setUser(userInfo);
    });
    return () => stopSync();
  }, []);
  //기록 가져오기
  useEffect(() => {
    console.log('기록가져오기');
    const stopSync = diaryRepository.syncDiary(stateUserId, (data) => {
      setMemories(data);
    });
    return () => stopSync();
  }, [user, diaryRepository]);

  //로그아웃
  const onLogout = () => {
    console.log('로그아웃');
    auth.logout();
  };

  //계정탈퇴
  const onDeleteAccount = () => {
    console.log('계정탈퇴');
    userRepository.deleteUser(user.userId);
    console.log(user.userId);
    auth.deleteAuth();
  };

  const wallpaperIcon = [
    {
      name: '로그아웃',
      src: '/images/logoutIcon.svg',
      onClick: onLogout,
    },
    {
      name: '계정탈퇴',
      src: '/images/deleteAccounticon.svg',
      onClick: () => setShowModal(openModal('delete', showModal)),
    },
    {
      name: '우리들 이야기',
      src: '/images/oursIcon.svg',
      onClick: () => {
        navigate('/ours', { state: { user } });
      },
    },
  ];
  const myDiaryIcon = [
    {
      name: '일기장',
      src: '/images/calendarIcon.svg',
      onClick: () => {
        setShowModal(openModal('calendar', showModal));
      },
    },
  ];

  return (
    <section id='record'>
      <div className={styles.record}>
        <div
          className={`${
            (showModal.delete || showModal.calendar) && styles.hide
          }`}
        >
          <WallpaperIcon wallpaperIcon={wallpaperIcon} />
          <div className={styles.pcHide}>
            <WallpaperIcon wallpaperIcon={myDiaryIcon} location='right' />
          </div>
        </div>
        {showModal.calendar && (
          <CalendarFrame
            memories={memories}
            user={user}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        {showModal.delete && (
          <ConfirmModal
            message='정말 계정을 삭제하시겠습니까?'
            onCancel={() => setShowModal(closeModal('delete', showModal))}
            onConfirm={onDeleteAccount}
          />
        )}
      </div>
    </section>
  );
};

export default Record;
