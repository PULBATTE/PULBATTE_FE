import jwtDecode from 'jwt-decode';

export class jwtUtils {
  // 토큰 유효성 검사
  static isAuth(token) {
    if (!token) {
      console.log('false');
      return false;
    }
    console.log(true);
    return true;
  }

  // 토큰에서 유저 id 가져오기
  static getId(token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
}
