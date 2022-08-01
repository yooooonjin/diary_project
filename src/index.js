import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import GetMemoryList from './components/service/getMemoryList';
import Authentication from './components/service/authentication';
import DiaryRepository from './components/service/diaryRepository';
import FileUpload from './components/service/fileUpload';

const auth = new Authentication();
const getMemoryList = new GetMemoryList();
const diaryRepository = new DiaryRepository();
const fileUpload = new FileUpload();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      getMemoryList={getMemoryList}
      auth={auth}
      diaryRepository={diaryRepository}
      fileUpload={fileUpload}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
