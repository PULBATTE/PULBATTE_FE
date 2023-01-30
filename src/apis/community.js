import { authInstance, instance } from './axios';

export const getBestPostApi = async () => {
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

export const getPostUserApi = async postId => {
  try {
    console.log(postId);
    const data = await authInstance.get(`/api/posts/user/${postId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getPostGuestApi = async postId => {
  try {
    const data = await authInstance.get(`/api/posts/guest/${postId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const postLikeApi = async postId => {
  console.log({ postId });
  try {
    const data = await authInstance.post(`/api/posts/${postId}/postLike`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

// export const getPostByTagApi = async tagId => {
//   // get 요청 오류: 파라미터가 배열로 들어감(리액트 쿼리 때문) => string으로 바꿔주기
//   console.log('tag');
//   console.log(tagId.queryKey);
//   const [tag] = tagId.queryKey;
//   console.log(tag);
//   try {
//     const data = await instance.get(`/api/posts/category/${tag}`);
//     return data;
//   } catch (error) {
//     throw Error(error);
//   }
// };

export const getPostByTagApi = async ({ tag, pageParam }) => {
  try {
    const data = await instance.get(
      `/api/posts/category/${tag}?page=${pageParam}`,
    );

    const { content, last } = data.data;
    return { content, nextPage: pageParam + 1, isLast: last };
  } catch (error) {
    throw Error(error);
  }
};

export const postCommentApi = async (postId, commentId, content) => {
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

export const deleteCommentApi = async commentId => {
  try {
    const data = await authInstance.delete(`/api/posts/comments/${commentId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const editCommentApi = async (commentId, content) => {
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
