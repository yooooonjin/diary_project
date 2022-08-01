import React from 'react';
import './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Memory from './components/memory/memory';
import DiaryList from './components/diaryList/diaryList';
import Login from './components/login/login';

function App({ getMemoryList, auth, diaryRepository, fileUpload }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login auth={auth} />} />
        <Route
          path='/diary'
          element={
            <DiaryList
              getMemoryList={getMemoryList}
              diaryRepository={diaryRepository}
            />
          }
        />
        <Route
          path='/memory'
          element={
            <Memory diaryRepository={diaryRepository} fileUpload={fileUpload} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
