import React from 'react';
import { instance } from './axios';

export const plantsFilterApi = async category => {
  try {
    const data = await instance.get(`/api/plants/categories/${category}`);

    return data.data.plantList;
  } catch (error) {
    return error;
  }
};

export const plantsSearchApi = async plantName => {
  try {
    const data = await instance.get(`/api/plants/search?keyword=${plantName}`);

    return data.data.plantList;
  } catch (error) {
    return error;
  }
};

export const plantsGlobalListApi = async () => {
  try {
    const data = await instance.get(`/api/plants`);

    return data;
  } catch (error) {
    return error;
  }
};

export const plantsSearchDetailApi = async plantId => {
  try {
    const data = await instance.get(`/api/plants/detail/${plantId}`);

    return data;
  } catch (error) {
    return error;
  }
};
