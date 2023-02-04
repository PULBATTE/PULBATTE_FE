import { Cookies } from 'react-cookie';
import { instance } from './axios';

const cookies = new Cookies();
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { path: '/' });
};

export const getCookie = name => {
  return cookies.get(name);
};

export const removeCookie = name => {
  return cookies.remove(name);
};

export const kakaoLogin = code => {
  return async function () {
    await instance
      .post(`/api/user/kakao/callback?code=${code}`)
      .then(response => {
        localStorage.setItem('access_Token', response.data.accessToken);
        setCookie('refresh_Token', response.data.refreshToken);
        localStorage.setItem('access_Token', response.headers.authorization);

        window.location.href = '/';
      })
      .catch(err => {
        window.alert('로그인에 실패하였습니다.');
      });
  };
};
