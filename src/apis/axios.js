import axios from 'axios';
import { Cookies } from 'react-cookie';

export const authInstance = axios.create({
  baseURL: 'https://pulbatte.com',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.request.use(config => {
  if (config.headers === undefined) return;
  /* const token = localStorage.getItem('Token'); */
  const cookies = new Cookies();
  const token = cookies.get('Token');

  config.headers.Authorization = token;
  // eslint-disable-next-line consistent-return
  return config;
});

export const instance = axios.create({
  baseURL: 'https://pulbatte.com',
});
