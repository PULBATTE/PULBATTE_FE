import { authInstance } from './axios';

export const getPlantsInfoApi = async () => {
  try {
    const data = await authInstance.get(`/api/beginner/plant/my`);

    return data.data;
  } catch (error) {
    return error;
  }
};
export const getAllPlantsInfoApi = async () => {
  try {
    const data = await authInstance.get(`/api/beginner/plant`);
    return data.data;
  } catch (error) {
    return error;
  }
};
export const postSelectPlantApi = async beginnerName => {
  try {
    const data = await authInstance.post(`/api/beginner/plant/${beginnerName}`);
    return data.data;
  } catch (error) {
    return error;
  }
};
export const postPlantsInfoApi = async (time, value) => {
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
export const getTestInfoApi = async () => {
  try {
    const data = await authInstance.get(`/api/plantTest`);

    return data.data;
  } catch (error) {
    return error;
  }
};
export const deleteGuidePlantApi = async () => {
  try {
    const data = await authInstance.delete(`/api/beginner/plant`);
    return data.data;
  } catch (error) {
    return error;
  }
};
