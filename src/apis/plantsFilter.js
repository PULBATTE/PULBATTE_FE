import React from 'react';
import { instance } from './axios';

export const plantsFilter = async category => {
  try {
    const data = await instance.get(`/api/plants/categories/${category}`);
    console.log(data.data.plantList);
    return data.data.plantList;
  } catch (error) {
    return error;
  }
};

export const plantsSearch = async plantName => {
  console.log('plantName', plantName);
  try {
    const data = await instance.get(`/api/plants/search?keyword=${plantName}`);
    console.log(data.data);
    return data.data.plantList;
  } catch (error) {
    return error;
  }
};

export const plantsGlobalList = async () => {
  try {
    const data = instance.get(`/api/plants`);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
