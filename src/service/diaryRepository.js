import { getDatabase, ref, set, onValue, off, remove } from 'firebase/database';
import firebaseApp from './firebaseConfig';

class DiaryRepository {
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  saveDiary = (userId, memory, day) => {
    set(ref(this.db, `diary/${userId}/${day}`), memory);
  };
  deleteDiary = (userId, day) => {
    remove(ref(this.db, `diary/${userId}/${day}`));
  };

  syncDiary = (userId, onUpdate) => {
    const query = ref(this.db, `diary/${userId}`);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      onUpdate(data);
    });
    return () => {
      off(query);
    };
  };
  //////////////////////////////////////////////////////
  createOurDiary = (diaryId, users) => {
    set(ref(this.db, `ourDiary/${diaryId}/member`), users);
  };

  saveOurDiary = (diaryId, userId, memory, day) => {
    set(ref(this.db, `ourDiary/${diaryId}/${day}/${userId}`), memory);
  };

  deleteMyDiaryInOurs = (diaryId, userId, day) => {
    remove(ref(this.db, `ourDiary/${diaryId}/${day}/${userId}`));
  };

  deleteOurDiary = (diaryId, userId, diaryList, memberList) => {
    set(ref(this.db, `myList/${userId}`), diaryList);
    set(ref(this.db, `ourDiary/${diaryId}/member`), memberList);
  };

  syncOurDiary = (diaryId, onUpdate) => {
    const query = ref(this.db, `ourDiary/${diaryId}`);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      onUpdate(data);
    });
    return () => {
      off(query);
    };
  };
  //////////////////////////////////////////////////////
  createMyDiaryList = (diaryId, userId, diaryTitle) => {
    set(ref(this.db, `myList/${userId}/${diaryId}`), diaryTitle);
  };
  syncMyDiaryList = (userId, onUpdate) => {
    const query = ref(this.db, `myList/${userId}`);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      onUpdate(data);
    });
    return () => {
      off(query);
    };
  };
}
export default DiaryRepository;
