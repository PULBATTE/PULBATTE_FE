import { instance } from './axios';

export const postSignup = async ({ userId, password }) => {
  try {
    const data = await instance.post('/api/auth/signup', {
      userId,
      password,
    });
    return data;
  } catch (error) {
    return error;
  }
};
