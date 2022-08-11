import { getDatabase, ref, set, onValue, off, remove } from 'firebase/database';
import firebaseApp from './firebaseConfig';

class UsersRepository {
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  saveUser = (userId, userInfo) => {
    set(ref(this.db, `userInfo/${userId}`), userInfo);
  };
  deleteUser = (userId) => {
    remove(ref(this.db, `userInfo/${userId}`));
    remove(ref(this.db, `diary/${userId}`));
    remove(ref(this.db, `myList/${userId}`));
  };

  syncUser = (userId, onUpdate) => {
    const query = ref(this.db, `userInfo/${userId}`);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      onUpdate(data);
    });
    return () => {
      off(query);
    };
  };

  ///////////////////////pusRecord//////////////////////////
  syncUsers = (onUpdate) => {
    const query = ref(this.db, `userInfo`);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      onUpdate(data);
    });
    return () => {
      off(query);
    };
  };
}
export default UsersRepository;
