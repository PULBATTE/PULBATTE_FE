import { instance, authInstance } from './axios';

export const postSignUpApi = async ({ userId, password }) => {
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

export const getInfoApi = async () => {
  try {
    const { data } = await authInstance.get('/api/auth/info');
    return data;
  } catch (error) {
    throw Error(error);
  }
};
