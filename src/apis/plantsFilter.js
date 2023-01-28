import React from 'react';
import { instance } from './axios';

export const plantsFilterApi = async (category, pageParam) => {
  try {
    const data = await instance.get(
      `/api/plants/categories/${category}?page=${pageParam}`,
    );

    const { content, last } = data.data;
    return { posts: content, nextPage: pageParam + 1, isLast: last };
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

export const plantsGlobalListApi = async pageParam => {
  try {
    /* api/plants?page=${pageParam} */
    const data = await instance.get(`/api/plants?idx=322`);

    const { content, last } = data.data;

    return { posts: content, nextPage: pageParam + 1, isLast: last };
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

export const plantsSearchBeginnerlApi = async () => {
  try {
    const data = await instance.get(`/api/plants/categories/beginner/1`);

    return data.data.plantList;
  } catch (error) {
    return error;
  }
};
