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

export const getPostUser = async postId => {
  try {
    console.log(postId);
    const data = await authInstance.get(`/api/posts/user/${postId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getPostGuest = async postId => {
  try {
    const data = await authInstance.get(`/api/posts/guest/${postId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const PostLike = async postId => {
  console.log({ postId });
  try {
    const data = await authInstance.post(`/api/posts/${postId}/postLike`);
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

export const postComment = async (postId, commentId, content) => {
  try {
    const data = await authInstance.post(
      `/api/posts/${postId}/comments/${commentId}`,
      { content },
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const deleteComment = async commentId => {
  try {
    const data = await authInstance.delete(`/api/posts/comments/${commentId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const editComment = async (commentId, content) => {
  try {
    console.log({ content });
    const data = await authInstance.put(`/api/posts/comments/${commentId}`, {
      content,
    });
    return data;
  } catch (error) {
    throw Error(error);
  }
};
