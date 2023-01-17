import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../../apis/kakaoLogin';

export default function Kakao() {
  const dispatch = useDispatch();

  // 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('code:', code);
  dispatch(kakaoLogin(code));

  return <div />;
}
