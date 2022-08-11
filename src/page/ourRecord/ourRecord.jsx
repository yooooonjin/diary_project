import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ourRecord.module.css';
import CalendarFrame from '../../components/calendarFrame/calendarFrame';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import InviteModal from '../../components/inviteModal/inviteModal';
import {
  closeAllModal,
  closeModal,
  openModal,
} from '../../service/modalController';
import ConfirmModal from '../../components/confirmModal/confirmModal';

const OurRecord = ({ userRepository, diaryRepository }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(useLocation().state.user);
  const [ourDiaryIcon, setOurDiaryIcon] = useState();
  const [myMemoryList, setMyMemoryList] = useState([]);
  const [ourMemories, setOurMemories] = useState();
  const [selectDiary, setSelectDiary] = useState();

  const [showModal, setShowModal] = useState({
    invite: false,
    ourCalendar: false,
    delete: false,
  });

  let iconIndex = 0;

  useEffect(() => {
    console.log('user : ', user);
    console.log('사용자 아니면 퇴장');
    !user.userId && navigate('/');
  }, [user]);

  // 일기 리스트 가져오기
  useEffect(() => {
    console.log('일기리스트 가져오기');
    const stopSync = diaryRepository.syncMyDiaryList(user.userId, (data) => {
      setMyMemoryList(data);
    });
    return () => stopSync();
  }, []);

  //우리의 일기 데이터 가져오기
  useEffect(() => {
    console.log('일기장 데이터 가져오기');
    let ourDiaryList = [];
    for (const key in myMemoryList) {
      ourDiaryList.push({
        name: myMemoryList[key],
        src: `/images/animalIcon/animal${iconIndex}.svg`,
        onClick: () => {
          const stopSync = diaryRepository.syncOurDiary(key, (data) => {
            setOurMemories({});
            setSelectDiary(key);
            setOurMemories(data);
            stopSync();
          });

          setShowModal(openModal('ourCalendar', showModal));
        },
      });
      iconIndex++;
    }
    setOurDiaryIcon(ourDiaryList);
  }, [myMemoryList]);

  //우리의 일기 추가
  const handleMakeOurMemories = (selectedFriendsAndMe, diaryTitle) => {
    console.log('일기추가');
    setShowModal(closeModal('invite', showModal));
    const date = Date.now();
    diaryRepository.createOurDiary(date, selectedFriendsAndMe);
    selectedFriendsAndMe.forEach((user) => {
      diaryRepository.createMyDiaryList(date, user.userId, diaryTitle);
    });
    setMyMemoryList((myMemoryList) => {
      return { ...myMemoryList, [date]: diaryTitle };
    });
  };

  //우리의 일기 삭제
  const handleDeleteOurMemories = () => {
    console.log('일기삭제');
    const newMyMemoryList = { ...myMemoryList };
    delete newMyMemoryList[selectDiary];
    setMyMemoryList(newMyMemoryList);

    const newMemberList = ourMemories.member.filter((member) => {
      return member.userId !== user.userId;
    });
    setOurMemories((ourMemories) => {
      return { ...ourMemories, member: newMemberList };
    });

    diaryRepository.deleteOurDiary(
      selectDiary,
      user.userId,
      newMyMemoryList,
      newMemberList
    );
    setShowModal(closeAllModal(['delete', 'ourCalendar'], showModal));
  };
  const wallpaperIcon = [
    {
      name: '홈',
      src: '/images/homeIcon.svg',
      onClick: () =>
        navigate('/record', { state: { user: { id: user.userId } } }),
    },
    {
      name: '일기장 만들기',
      src: '/images/inviteIcon.svg',
      onClick: () => setShowModal(openModal('invite', showModal)),
    },
  ];

  return (
    <>
      <section id='ourRecord'>
        <div className={styles.ourRecord}>
          <div
            className={`${
              (showModal.invite || showModal.ourCalendar) && styles.hide
            }`}
          >
            <WallpaperIcon wallpaperIcon={wallpaperIcon} location={'left'} />
          </div>
          {showModal.invite && (
            <InviteModal
              userRepository={userRepository}
              me={user}
              showModal={showModal}
              setShowModal={setShowModal}
              onMakeOurMemories={handleMakeOurMemories}
            />
          )}
          {showModal.ourCalendar && (
            <CalendarFrame
              memories={ourMemories}
              user={user}
              showModal={showModal}
              setShowModal={setShowModal}
              selectDiary={selectDiary}
            />
          )}
          <div
            className={`${
              (showModal.invite || showModal.ourCalendar) && styles.hide
            }`}
          >
            {ourDiaryIcon && (
              <WallpaperIcon wallpaperIcon={ourDiaryIcon} location={'right'} />
            )}
          </div>
        </div>
      </section>
      {showModal.delete && (
        <ConfirmModal
          message='정말 우리의 일기를 지울건가요? :('
          onCancel={() => {
            setShowModal(closeModal('delete', showModal));
          }}
          onConfirm={handleDeleteOurMemories}
        />
      )}
    </>
  );
};

export default OurRecord;
