import { getDatabase, ref, set, onValue, off } from 'firebase/database';
import firebaseApp from './firebaseConfig';

class DiaryRepository {
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  saveDiary = (userId, memory, day) => {
    set(ref(this.db, `users/${userId}/${day}`), memory);
  };

  syncDiary = (userId, onUpdate) => {
    const query = ref(this.db, `users/${userId}`);
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
