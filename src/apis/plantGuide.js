import { authInstance } from './axios';

export const getPlantsInfo = async () => {
  try {
    const data = await authInstance.get(`/api/beginner/plant/my`);

    /*     console.log('data:', data.data); */
    return data.data;
  } catch (error) {
    return error;
  }
};
export const getAllPlantsInfo = async () => {
  try {
    const data = await authInstance.get(`/api/beginner/plant`);
    return data.data;
  } catch (error) {
    return error;
  }
};
export const postSelectPlant = async beginnerName => {
  try {
    const data = await authInstance.post(`/api/beginner/plant/${beginnerName}`);
    return data.data;
  } catch (error) {
    return error;
  }
};
export const postPlantsInfo = async (time, value) => {
  console.log(time, value);

  try {
    const data = await authInstance.post(`/api/beginner/plant`, {
      localDate: time,
      value,
    });

    return data.data;
  } catch (error) {
    return error;
  }
};
export const getTestInfo = async () => {
  try {
    const data = await authInstance.get(`/api/plantTest`);

    return data.data;
  } catch (error) {
    return error;
  }
};
