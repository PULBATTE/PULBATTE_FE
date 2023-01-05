import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from '../page/SignUpPage';

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
