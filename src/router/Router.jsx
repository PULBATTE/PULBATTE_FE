import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/common/header/Header';
import Kakao from '../page/signin/Kakao';
import SignIn from '../page/signin/SignIn';
import Home from '../page/home/Home';
import NotFound from '../page/NotFound';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/user/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/api/user/kakao/callback" element={<Kakao />} />
      </Routes>
    </BrowserRouter>
  );
}
