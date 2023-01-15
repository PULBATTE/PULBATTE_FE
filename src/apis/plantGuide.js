import { authInstance } from './axios';

export const getPlantsInfo = async () => {
  try {
    const data = await authInstance.get(`/api/beginner/plant/my`);

    /*   console.log('data:', data.data); */
    return data.data;
  } catch (error) {
    return error;
  }
};

export const postPlantsInfo = async (time, value) => {
  console.log(time, value);

  try {
    const data = await authInstance.post(`/api/beginner/plant`, {
      localData: time,
      value,
    });

    return data.data;
  } catch (error) {
    return error;
  }
};
