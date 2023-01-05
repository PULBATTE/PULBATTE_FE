import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/common/Header';
import Kakao from '../components/common/signin/Kakao';
import SignIn from '../components/common/signin/SignIn';

import NotFound from '../page/NotFound';

export default function Router() {
  return (
    <BrowserRouter>
      {/*  <Header /> */}
      <Routes>
        <Route path="/api/user/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/api/user/kakao/callback" element={<Kakao />} />
      </Routes>
    </BrowserRouter>
  );
}
