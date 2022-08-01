import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseApp from './firebaseConfig';

class Authentication {
  constructor() {
    this.auth = getAuth(firebaseApp);
    this.provider = new GoogleAuthProvider();
  }
  googleLogin = async () => {
    return signInWithPopup(this.auth, this.provider);
  };
}

export default Authentication;
