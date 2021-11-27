import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Houses from './pages/Houses';
import Character from './pages/Character';
import NotFound from './pages/NotFound';

const App = () => (
  <div className="App">

    <Routes>
      <Route path="/" element={<Houses />} />
      <Route path="/characters/:slug" element={<Character />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
