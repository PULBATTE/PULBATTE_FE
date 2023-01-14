import { authInstance } from './axios';

export const getPlantsInfo = async name => {
  try {
    const data = await authInstance.get(`/api/beginner/plant/${name}`);

    /*   console.log('data:', data.data); */
    return data.data;
  } catch (error) {
    return error;
  }
};

export const postPlantsInfo = async (name, time, value) => {
  console.log(name, time, value);
  try {
    const data = await authInstance.post(`/api/beginner/plant/${name}`, {
      currentTime: time,
      value,
    });
    console.log({ currentTime: time, value });
    console.log('data:', data);
    return data.data;
  } catch (error) {
    return error;
  }
};
