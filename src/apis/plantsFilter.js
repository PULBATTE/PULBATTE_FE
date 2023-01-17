import React from 'react';
import { instance } from './axios';

export const plantsFilter = async category => {
  try {
    const data = await instance.get(`/api/plants/categories/${category}`);

    return data.data.plantList;
  } catch (error) {
    return error;
  }
};

export const plantsSearch = async plantName => {
  try {
    const data = await instance.get(`/api/plants/search?keyword=${plantName}`);

    return data.data.plantList;
  } catch (error) {
    return error;
  }
};

export const plantsGlobalList = async () => {
  try {
    const data = instance.get(`/api/plants`);

    return data;
  } catch (error) {
    return error;
  }
};
