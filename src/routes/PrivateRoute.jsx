import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { jwtUtils } from '../util/jwtUtils';

// eslint-disable-next-line consistent-return
export default function PrivateRoute(redirectPath, currentPath) {
  // 넘어갈 path , redirect path

  const token = localStorage.getItem('access_Token');

  // redirectUrl은 로그인이 성공후 돌아갈 화면
  if (!jwtUtils.isAuth(token)) {
    alert('로그인이 필요한 페이지입니다');
    window.location.href = `/api/user/signin?redirectUrl=${redirectPath}`;
    return;
  }
  window.location.href = `${redirectPath}`;
}
