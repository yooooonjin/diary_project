import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
  updateProfile,
} from 'firebase/auth';
import firebaseApp from './firebaseConfig';

class Authentication {
  constructor() {
    this.auth = getAuth(firebaseApp);
    this.provider = new GoogleAuthProvider();
  }

  signUp = async (email, password) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  };
  signIn = (email, password) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  };

  googleLogin = async () => {
    return signInWithPopup(this.auth, this.provider);
  };

  logout = () => {
    this.auth.signOut();
  };

  authChange = (onChange) => {
    onAuthStateChanged(this.auth, (user) => {
      onChange(user);
    });
  };

  deleteAuth = () => {
    const user = this.auth.currentUser;
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        console.log(error);
        // An error ocurred
        // ...
      });
  };
}

export default Authentication;
