import axios from 'axios';
import { Cookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from './cookie';

export const authInstance = axios.create({
  baseURL: 'https://api.pulbatte.com',
});

authInstance.interceptors.request.use(config => {
  if (config.headers === undefined) console.log(config.headers);
  const token = localStorage.getItem('access_Token');
  if (token == 'undefined') {
    alert('페이지에 문제가 생겨 다시 로그인을 해주세요.');
    localStorage.removeItem('access_Token');
    window.location.href = 'api/user/signin';
    return;
  }
  config.headers.Authorization = token;

  // eslint-disable-next-line consistent-return
  return config;
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
    const currentAToken = localStorage.getItem('access_Token');
    const userEmail = jwtDecode(currentAToken).sub;

    if (error.response.data.statuscode === 401) {
      if (error.response.data.msg === 'Token Error') {
        const originalRequest = config;

        const refreshToken = getCookie('refresh_Token');

        // token refresh 요청
        const data = await axios.post(
          `https://api.pulbatte.com/api/token/retoken`,
          { refreshToken, userEmail }, // token refresh api
          {
            headers: {
              Authorization: currentAToken,
            },
          },
        );
        // 새로운 토큰 저장
        console.log(data);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.data;
        console.log(newAccessToken, '새로발급받은 토큰');
        localStorage.setItem('access_Token', newAccessToken);
        setCookie('refresh_Token', newRefreshToken);

        originalRequest.headers.authorization = newAccessToken;

        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        /*      return axios(originalRequest); */
      }
    }

    console.log('response error', error);
    return Promise.reject(error);
  },
);

export const instance = axios.create({
  baseURL: 'https://api.pulbatte.com',
});
