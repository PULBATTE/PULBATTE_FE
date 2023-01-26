import { authInstance, instance } from './axios';

export const getUserProfileInfo = async () => {
  try {
    const data = await authInstance.get('/api/user/mypage/myprofile');
    return data.data;
  } catch (error) {
    throw Error(error);
  }
};

export const putUserProfileInfo = async formData => {
  try {
    console.log(formData);
    const data = await authInstance.put('/api/user/mypage/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  } catch (error) {
    throw Error(error);
  }
};

export const putUserNickNameInfo = async formData => {
  try {
    console.log(formData);
    const data = await authInstance.put(
      '/api/user/mypage/profilename',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data.data;
  } catch (error) {
    throw Error(error);
  }
};

export const postUserNickName = async nickName => {
  console.log(nickName);
  try {
    const data = await authInstance.post(
      '/api/user/mypage/nickDupleCheck',
      nickName,
    );
    return data.data;
  } catch (error) {
    throw Error(error);
  }
};

export const getBoardList = async pageParam => {
  try {
    const data = await authInstance.get(
      `/api/user/mypage/mypost?page=${pageParam}`,
    );
    console.log(data);
    return data.data;
  } catch (error) {
    throw Error(error);
  }
};
