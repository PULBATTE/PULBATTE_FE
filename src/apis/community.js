import { authInstance, instance } from './axios';

export const getBestPost = async () => {
  try {
    const data = await instance.get('/api/posts/popular');
    return data;
  } catch (error) {
    throw Error(error);
  }
};

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
    const data = await authInstance.get(`/api/posts/user/${postId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getPostByTag = async tag => {
  try {
    const data = await instance.get(`/api/posts/category/${tag}`);
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

export const deleteComment = async (postId, commentId) => {
  try {
    const data = await authInstance.delete(
      `/api/posts/${postId}/comments/${commentId}`,
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const editComment = async (postId, commentId, content) => {
  try {
    const data = await authInstance.put(`/api/posts/comments/${commentId}`, {
      content,
    });
    return data;
  } catch (error) {
    throw Error(error);
  }
};
