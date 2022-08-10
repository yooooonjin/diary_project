import React from 'react';
import './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/login/login';
import OurRecord from './page/ourRecord/ourRecord';
import Record from './page/record/record';
import TodayDiary from './page/todayDiary/todayDiary';
import OurTodayDiary from './page/ourTodayDiary/ourTodayDiary';

function App({ auth, diaryRepository, userRepository, fileUpload }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Login auth={auth} userRepository={userRepository} />}
        />
        <Route
          path='/record'
          element={
            <Record
              diaryRepository={diaryRepository}
              userRepository={userRepository}
              auth={auth}
            />
          }
        />
        <Route
          path='/todayDiary'
          element={
            <TodayDiary
              diaryRepository={diaryRepository}
              fileUpload={fileUpload}
            />
          }
        />
        <Route
          path='/ours'
          element={
            <OurRecord
              diaryRepository={diaryRepository}
              userRepository={userRepository}
              auth={auth}
            />
          }
        />
        <Route
          path='/ourMemory'
          element={
            <OurTodayDiary
              diaryRepository={diaryRepository}
              fileUpload={fileUpload}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
