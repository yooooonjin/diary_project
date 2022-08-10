import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/confirmModal/confirmModal';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import styles from './record.module.css';
import CalendarFrame from '../../components/calendarFrame/calendarFrame';

const Record = ({ diaryRepository, userRepository, auth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateUserId = location?.state.user.id;

  const [user, setUser] = useState();
  const [memories, setMemories] = useState({});
  const [showModal, setShowModal] = useState({ delete: false });

  console.log(user);

  //기록 가져오기
  useEffect(() => {
    const stopSync = diaryRepository.syncDiary(stateUserId, (data) => {
      setMemories(data);
    });
    return () => stopSync();
  }, [diaryRepository]);

  //인증
  useEffect(() => {
    auth.authChange((user) => {
      !user && navigate('/');
    });
  }, [user, auth]);

  //사용자 정보 가져오기
  useEffect(() => {
    const stopSync = userRepository.syncUser(stateUserId, (userInfo) => {
      setUser(userInfo);
    });
    return () => stopSync();
  }, []);

  //로그아웃
  const onLogout = () => {
    auth.logout();
  };

  //계정탈퇴
  const onDeleteAccount = () => {
    auth.deleteAuth().then(() => {
      userRepository.deleteUser(user.id);
    });
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
      onClick: () => setShowModal({ delete: true }),
    },
    {
      name: '우리들 이야기',
      src: '/images/oursIcon.svg',
      onClick: () => {
        navigate('/ours', { state: { user } });
      },
    },
  ];

  return (
    <section id='record'>
      <div className={styles.record}>
        <WallpaperIcon wallpaperIcon={wallpaperIcon} />
        <CalendarFrame memories={memories} user={user} />
        {showModal.delete && (
          <ConfirmModal
            message='정말 계정을 삭제하시겠습니까?'
            onCancel={() => setShowModal({ delete: false })}
            onConfirm={onDeleteAccount}
          />
        )}
      </div>
    </section>
  );
};

export default Record;
