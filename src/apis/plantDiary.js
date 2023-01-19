import { authInstance, instance } from './axios';

export const getPlantList = async () => {
  try {
    const data = await authInstance.get('/api/plantjournals');
    return data;
  } catch (error) {
    throw Error(error);
  }
};
