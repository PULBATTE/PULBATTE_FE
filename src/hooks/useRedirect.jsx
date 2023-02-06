import { useState, useEffect } from 'react';
// import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { jwtUtils } from '../util/jwtUtils';

/**
 * Token에 저장되어 있는 사용자의 email주소와 로그인 되어 있지 않은 사용자의 redirect로 보내줌
 * 사실상 Token의 정보를 사용하지 않기 때문에 hook이 필요해 보이진 않으나
 * 로그인이 필요한 페이지에서 로그아웃 후 뒤로가기로 접근이 가능해 redirect를 해주기 위해 hook으로 만들어봄
 * return 값이 의미 있진 않은 것 같아 고민됨
 * @param {string} redirectUrl - redirect 보낼 위치(default main) ex) /postlist -> postlist페이지로 보냄
 *
 */
export default function useRequireAuth(redirectUrl = '/') {
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const cookie1 = new Cookies();
  console.log({ cookie1 });

  const logout = () => {
    const cookie = new Cookies();

    cookie.remove('refresh_Token');
    localStorage.removeItem('access_Token');
  };

  useEffect(() => {
    // localStorage에 있는 accessToken을 확인
    const getAccess = localStorage.getItem('access_Token');
    if (!jwtUtils.isAuth(getAccess)) {
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
