import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarFrame from '../../components/calendarFrame/calendarFrame';
import WallpaperIcon from '../../components/wallpaperIcon/wallpaperIcon';
import InviteModal from '../../components/inviteModal/inviteModal';
import styles from './ourRecord.module.css';

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
  });

  console.log('user : ', user);
  let iconIndex = 0;
  console.log('myMemoryList : ', myMemoryList);
  console.log('ourDiaryIcon :', ourDiaryIcon);
  console.log('selectDiary :', selectDiary);
  console.log('ourMemories :', ourMemories);

  useEffect(() => {
    !user.userId && navigate('/');
  }, [user]);

  // 일기 리스트 가져오기
  useEffect(() => {
    const stopSync = diaryRepository.syncMyDiaryList(user.userId, (data) => {
      setMyMemoryList(data);
    });
    return () => stopSync();
  }, []);

  //우리의 일기 데이터 가져오기
  useEffect(() => {
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
          });
          // stopSync();

          openModal('ourCalendar');
        },
      });
      iconIndex++;
    }
    setOurDiaryIcon(ourDiaryList);
  }, [myMemoryList]);

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

  //우리의 일기 추가
  const handleMakeOurMemories = (selectedFriendsAndMe, diaryTitle) => {
    closeModal('invite');
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
    closeModal('ourCalendar');
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
      onClick: () => openModal('invite'),
    },
  ];

  return (
    <section id='ourRecord'>
      <div className={styles.ourRecord}>
        <WallpaperIcon wallpaperIcon={wallpaperIcon} location={'left'} />
        {showModal.invite && (
          <InviteModal
            userRepository={userRepository}
            me={user}
            onClose={closeModal}
            onMakeOurMemories={handleMakeOurMemories}
          />
        )}
        {showModal.ourCalendar && (
          <CalendarFrame
            memories={ourMemories}
            user={user}
            selectDiary={selectDiary}
            onClose={closeModal}
            onDeleteOurMemories={handleDeleteOurMemories}
          />
        )}
        {ourDiaryIcon && (
          <WallpaperIcon wallpaperIcon={ourDiaryIcon} location={'right'} />
        )}
      </div>
    </section>
  );
};

export default OurRecord;
