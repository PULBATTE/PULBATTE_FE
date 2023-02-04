import axios from 'axios';
import { Cookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from './cookie';

export const authInstance = axios.create({
  baseURL: 'https://api.pulbatte.com',
});

authInstance.interceptors.request.use(config => {
  if (config.headers === undefined) return;
  const token = localStorage.getItem('access_Token');

  /*   if (token == undefined) {
    alert('토큰 확인이 되지않습니다. 다시 로그인을 해주세요.');
    window.location.href = '/api/user/signin';
  } */
  config.headers.Authorization = token;

  // eslint-disable-next-line consistent-return
  return config;
});

export const instance = authInstance.create({
  baseURL: 'https://api.pulbatte.com',
});

authInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async error => {
    const {
      config,
      response: { status },
    } = error;
    const expiredToken = localStorage.getItem('access_Token');
    const userEmail = jwtDecode(expiredToken).sub;
    console.log(expiredToken);

    if (error.response.data.statuscode === 401) {
      if (error.response.data.msg === 'Token Error') {
        const originalRequest = config;
        console.log('config', originalRequest);
        const refreshToken = await getCookie('refresh_Token');
        console.log(refreshToken, '만료된 토큰 - 쿠키에서 가져옴');
        console.log(userEmail, '현재 유저의 이메일');
        // token refresh 요청
        const data = await axios.post(
          `https://api.pulbatte.com/api/auth/issue/token`,
          { refreshToken, userEmail }, // token refresh api
        );

        console.log('새로운 토큰을 받음', data);

        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.data;
        console.log(newAccessToken);
        console.log(newRefreshToken);
        localStorage.setItem('access_Token', newAccessToken);
        setCookie('refresh_Token', newRefreshToken);
        console.log('저장완료', localStorage.getItem('access_Token'));
        originalRequest.headers.authorization = newAccessToken;

        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }

    console.log('response error', error);
    return Promise.reject(error);
  },
);
