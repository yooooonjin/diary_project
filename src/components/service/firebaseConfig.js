import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB9S6ym2Sy6Xs45CvEENNgkMseaJKhk0wM',
  authDomain: 'record-of-memories.firebaseapp.com',
  databaseURL: 'https://record-of-memories-default-rtdb.firebaseio.com',
  projectId: 'record-of-memories',
  storageBucket: 'record-of-memories.appspot.com',
  messagingSenderId: '6388066302',
  appId: '1:6388066302:web:121455e400e459b7fc42af',
  measurementId: 'G-7D09DW9XD3',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
