import React, { useEffect, useRef, useState } from 'react';
import styles from './inviteModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import Dots from '../dots/dots';
import XButton from '../xButton/xButton';
import { closeModal } from '../../service/modalController';

const InviteModal = ({
  userRepository,
  me,
  showModal,
  setShowModal,
  onMakeOurMemories,
}) => {
  const [users, setUsers] = useState([]);
  const [searchBar, setSearchBar] = useState();
  const [searchFriends, setSearchFriends] = useState();
  const [selectedFriends, setSelectedFriends] = useState([]);
  const inputRef = useRef();

  //본인 제외한 모든 사용자 정보
  useEffect(() => {
    console.log('본인 제외한 모든 사용자 정보');
    const users = [];
    const stopSync = userRepository.syncUsers((data) => {
      for (const key in data) {
        const element = data[key];
        if (element.userId !== me.userId) {
          users.push(element);
        }
      }
      setUsers(users);
      setSearchFriends(users);
    });
    return () => stopSync();
  }, [userRepository]);

  //검색창 입력
  const handleSearchBarChange = (e) => {
    console.log('검색창 입력');
    setSearchBar(e.target.value);
  };

  //친구 검색
  const handleFriendSearch = (e) => {
    console.log('친구검색');
    e.preventDefault();
    const friendList = users.filter((user) => {
      return user.userName.indexOf(searchBar) >= 0;
    });
    // friendList.filter(() => {});
    setSearchFriends(friendList);
  };

  //함께 일기장을 작성할 친구 선택
  const handleSelectedFriend = (e) => {
    console.log('함께 일기장을 작성할 친구 선택');
    e.preventDefault();
    const selected = JSON.parse(e.currentTarget.id);
    setUsers((users) => {
      const newUsers = users.filter((user) => user.userId !== selected.userId);
      return newUsers;
    });
    setSelectedFriends([...selectedFriends, selected]);
    const newSearchFriends = searchFriends.filter(
      (friend) => friend.userId !== selected.userId
    );
    setSearchFriends(newSearchFriends);
  };

  //선택된 목록에서 친구 제외하기
  const handleSelectedFriendRemove = (e) => {
    console.log('선택된 목록에서 친구 제외하기');
    e.preventDefault();
    const remove = JSON.parse(e.currentTarget.id);
    setUsers((users) => [...users, remove]);
    setSearchFriends((searchFriends) => [...searchFriends, remove]);
    setSelectedFriends((selectedFriends) => {
      const selected = selectedFriends.filter(
        (friend) => friend.userId !== remove.userId
      );
      return selected;
    });
  };

  return (
    <>
      <section id='invite'>
        <div className={styles.invite}>
          <div className={styles.invite_container}>
            <div className={styles.invite_mark}>
              <Dots />
              <input
                className={styles.searchInput}
                onChange={handleSearchBarChange}
                placeholder='친구의 이름을 입력해주세요 :)'
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={styles.search}
                onClick={handleFriendSearch}
              />
              <XButton
                onClick={() => {
                  setShowModal(closeModal('invite', showModal));
                }}
              />
            </div>
            <div className={styles.friends_container}>
              <div className={styles.selectedFriends}>
                {selectedFriends &&
                  selectedFriends.map((selectedFriend) => {
                    return (
                      <div
                        key={selectedFriend.userId}
                        className={styles.selectedFriend}
                        onClick={handleSelectedFriendRemove}
                        id={JSON.stringify(selectedFriend)}
                      >
                        <div className={styles.selectedFriendName}>
                          {selectedFriend.userName}
                        </div>
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </div>
                    );
                  })}
              </div>
              <div className={styles.friends}>
                {searchFriends && searchFriends.length <= 0 && (
                  <div className={styles.nonexistent}>
                    검색한 이름을 가진 친구가 없어요 :(
                  </div>
                )}
                {searchFriends &&
                  searchFriends.map((friend) => {
                    return (
                      <div
                        key={friend.userId}
                        id={JSON.stringify(friend)}
                        className={styles.friendsInfo}
                        onClick={handleSelectedFriend}
                      >
                        <div className={styles.friendName}>
                          {friend.userName}
                        </div>
                        <div className={styles.friendEmail}>
                          ( {friend.userEmail} )
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.button_container}>
                <input
                  ref={inputRef}
                  className={styles.diaryTitle}
                  type='text'
                  placeholder='일기 제목을 입력해주세요. (6자 이하)'
                  maxLength='6'
                />
                <button
                  className={`${styles.button} ${styles.submitBtn}`}
                  onClick={() =>
                    onMakeOurMemories(
                      [...selectedFriends, me],
                      inputRef.current.value
                    )
                  }
                >
                  우리들의 기록 만들기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InviteModal;
