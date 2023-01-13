import { instance } from './axios';

export const kakaoLogin = code => {
  return async function () {
    console.log(code);

    await instance
      .get(`/api/user/kakao/callback?code=${code}`)
      .then(response => {
        alert('로그인에 성공하셨습니다.');

        const jwtToken = response.headers.authorization;

        localStorage.setItem('Token', JSON.stringify(jwtToken));

        window.location.href = '/';
      })
      .catch(err => {
        console.log('소셜로그인 에러', err);
        window.alert('로그인에 실패하였습니다.');
      });
  };
};
