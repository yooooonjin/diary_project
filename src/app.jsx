import React from 'react';
import './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Memory from './components/memory/memory';
import DiaryList from './components/diaryList/diaryList';

function App({ getMemoryList }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DiaryList getMemoryList={getMemoryList} />} />
        <Route path='/memory' element={<Memory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
