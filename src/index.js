import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import Authentication from './service/authentication';
import DiaryRepository from './service/diaryRepository';
import FileUpload from './service/fileUpload';
import UsersRepository from './service/usersRepository';

const auth = new Authentication();
const diaryRepository = new DiaryRepository();
const userRepository = new UsersRepository();
const fileUpload = new FileUpload();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App
    auth={auth}
    diaryRepository={diaryRepository}
    userRepository={userRepository}
    fileUpload={fileUpload}
  />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
