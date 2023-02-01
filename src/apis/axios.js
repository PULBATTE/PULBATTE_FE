import axios from 'axios';
import { Cookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { getCookie, setCookie } from './cookie';

export const authInstance = axios.create({
  baseURL: 'https://api.pulbatte.com',
});

authInstance.interceptors.request.use(config => {
  if (config.headers === undefined) return;
  const token = localStorage.getItem('access_Token');
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

    if (error.response.data.statuscode === 401) {
      if (error.response.data.msg === 'Token Error') {
        const originalRequest = config;
        const accessToken = localStorage.getItem('access_Token');
        const userEmail = jwtDecode(accessToken).sub;

        const refreshToken = await getCookie('refresh_Token');

        // token refresh 요청
        const data = await axios.post(
          `https://api.pulbatte.com/api/auth/issue/token`,
          { refreshToken, userEmail }, // token refresh api
        );

        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.data;

        setCookie('refresh_Token', newRefreshToken);
        originalRequest.headers.authorization = newAccessToken;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }

    console.log('response error', error);
    return Promise.reject(error);
  },
);
