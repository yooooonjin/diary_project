import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: 'record-of-memories.appspot.com',
  messagingSenderId: '6388066302',
  appId: '1:6388066302:web:121455e400e459b7fc42af',
  measurementId: 'G-7D09DW9XD3',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
