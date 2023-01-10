import axios from 'axios';

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
  const token = localStorage.getItem('Token');
  config.headers.Authorization = `${token}`;
  // eslint-disable-next-line consistent-return
  return config;
});

export const instance = axios.create({
  baseURL: 'https://pulbatte.com',
});
