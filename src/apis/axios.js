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
  config.headers.Authorization = token;
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
    const currentToken = localStorage.getItem('access_Token');

    const userEmail = jwtDecode(currentToken).sub;

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
              Authorization: currentToken,
            },
          },
        );

        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.data;
        localStorage.setItem('access_Token', newAccessToken);
        setCookie('refresh_Token', newRefreshToken);

        originalRequest.headers.authorization = newAccessToken;

        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export const instance = axios.create({
  baseURL: 'https://api.pulbatte.com',
});
