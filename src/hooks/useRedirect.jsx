import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { jwtUtils } from '../util/jwtUtils';

/**
 * @param {string} redirectUrl - redirect 보낼 위치(default main) ex) /postlist -> postlist페이지로 보냄
 */
export default function useRequireAuth(redirectUrl = '/') {
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const logout = () => {
    const cookie = new Cookies();

    cookie.remove('refresh_Token');
    localStorage.removeItem('access_Token');
  };

  useEffect(() => {
    // localStorage에 있는 accessToken을 확인
    const getAccess = localStorage.getItem('access_Token');
    if (!jwtUtils.isAuth(getAccess)) {
      // eslint-disable-next-line no-alert
      alert('로그인 정보가 확인되지 않습니다.');
      logout();
      navigate(redirectUrl);
    } else {
      const getUserId = jwtUtils.getId(getAccess);
      setUserId(getUserId);
    }
  }, [navigate, redirectUrl]);

  return { userId };
}
