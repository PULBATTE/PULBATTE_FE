import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { jwtUtils } from '../util/jwtUtils';

// eslint-disable-next-line consistent-return
export default function PrivateRoute(redirectPath, currentPath) {
  // 넘어갈 path , redirect path

  const cookies = new Cookies();
  const token = cookies.get('Token');

  // redirectUrl은 로그인이 성공후 돌아갈 화면
  console.log(jwtUtils.isAuth(token));
  if (!jwtUtils.isAuth(token) && currentPath) {
    window.location.href = `/community/geust`;
  }
  if (jwtUtils.isAuth(token) && currentPath) {
    window.location.href = `/community/user`;
  }
  if (!jwtUtils.isAuth(token)) {
    alert('로그인이 필요한 페이지입니다');
    window.location.href = `/api/user/signin?redirectUrl=${redirectPath}`;
    return;
  }
  window.location.href = `${redirectPath}`;
}
