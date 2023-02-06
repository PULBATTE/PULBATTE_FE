import { authInstance } from './axios';

export const getAlarmListApi = async () => {
  try {
    const data = await authInstance.get('/api/user/alarm');
    return data.data;
  } catch (error) {
    return error;
  }
};
