import { authInstance } from './axios';

export const getAlarmListApi = async () => {
  try {
    const data = await authInstance.get('/api/user/alarm');
    console.log(data.data);
    return data.data;
  } catch (error) {
    return error;
  }
};
