import { authInstance, instance } from './axios';

export const createPostApi = async formData => {
  try {
    const data = await authInstance.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getPost = async postId => {
  try {
    const data = await authInstance.get(`/api/posts/${postId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const postComment = async (postId, commentId, comment) => {
  try {
    const data = await authInstance.post(
      `/api/posts/${postId}/comments/${commentId}`,
      { comment },
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};
