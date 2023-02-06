/* eslint-disable consistent-return */
import React, { useState, useCallback, useEffect, useRef } from 'react';

import styled from 'styled-components';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import {
  getUserProfileInfo,
  putUserProfileInfo,
  postUserNickName,
  putUserNickNameInfo,
} from '../../apis/mypage';
import UserProfile from '../../components/mypage/UserProfile';
import MyPostWrapper from '../../components/mypage/MyPostWrapper';
import useRequireAuth from '../../hooks/useRedirect';

export default function Mypage() {
  const [changeProfile, setChangeProfile] = useState(false);
  const [uploadNickName, setUploadNickName] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [changeNickName, setChangeNickName] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const nickName = useRef();
  const [uploadProfileImg, setUploadProfileImg] = useState({
    image: null,
    preview: null,
  });

  // useRequireAuth();
  // redirect Path지정 가능
  useRequireAuth('/api/user/signin');
  // token에 있는 id (이메일)을 가져올 수 있음
  // const { uerId } = useRequireAuth('/api/user/signin');

  const getUserProfileApi = useCallback(async () => {
    await getUserProfileInfo().then(res => {
      setUploadProfileImg({
        preview: res.profileImage,
      });
      setUploadNickName(res.nickname);
    });
  }, []);

  const onChangeImgHandler = useCallback(e => {
    setUploadProfileImg({
      image: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
    setChangeImage(true);
  }, []);

  const onModifyProfileHandler = useCallback(() => {
    setChangeProfile(!changeProfile);
  }, []);

  const onCompleteProfileHandler = useCallback(() => {
    if (changeNickName && !checkNickName) return alert('중복확인을 해주세요');
    if (changeNickName && checkNickName && !changeImage) {
      const formData = new FormData();
      const request = { nickname: nickName.current.value };

      const blob = new Blob([JSON.stringify(request)], {
        type: 'application/json',
      });
      formData.append('request', blob);

      return putUserNickNameInfo(formData).then(res => {
        setChangeProfile(false);
        setChangeNickName(false);
        setChangeImage(false);
      });
    }
    if (!changeImage && !checkNickName) {
      const formData = new FormData();
      const request = { nickname: nickName.current.value };

      const blob = new Blob([JSON.stringify(request)], {
        type: 'application/json',
      });
      formData.append('request', blob);

      uploadProfileImg.image &&
        formData.append('image', uploadProfileImg.image);
      return putUserNickNameInfo(formData).then(res => {
        setChangeProfile(false);
        setChangeNickName(false);
        setChangeImage(false);
      });
    }

    const formData = new FormData();
    const request = { nickname: nickName.current.value };

    const blob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });
    formData.append('request', blob);

    uploadProfileImg.image && formData.append('image', uploadProfileImg.image);
    putUserProfileInfo(formData).then(res => {
      setChangeProfile(false);
      setChangeNickName(false);
      setChangeImage(false);
    });
  }, [checkNickName, uploadProfileImg, changeNickName]);

  const onCheckNickNameHandler = useCallback(async () => {
    const request = { nickname: nickName.current.value };
    await postUserNickName(request).then(res => {
      if (res.statusCode === 200) {
        alert('사용가능한 닉네임입니다.');
        return setCheckNickName(true);
      }
      if (res.statusCode === 409) {
        return alert('중복된 닉네임입니다.');
      }
    });
  }, []);

  useEffect(() => {
    getUserProfileApi();
  }, [changeProfile]);

  return (
    <StWrapper>
      <div className="mypage_conatainer">
        <div className="mypage_inner">
          <StTitle>마이페이지</StTitle>
          <StProfileWrapper>
            <StProfileInner>
              <StTitleContainer>
                <span className="section_title">프로필</span>
                <span className="section_comment">
                  풀밭에 오신 걸 환영합니다 :)
                </span>
              </StTitleContainer>
              <StUserInfo>
                <UserProfile
                  onChangeImgHandler={onChangeImgHandler}
                  uploadProfileImg={uploadProfileImg}
                  changeProfile={changeProfile}
                  uploadNickName={uploadNickName}
                  nickName={nickName}
                  onCheckNickNameHandler={onCheckNickNameHandler}
                  setChangeNickName={setChangeNickName}
                  changeNickName={changeNickName}
                />
                {changeProfile ? (
                  <Button
                    type="button"
                    className="confirm_btn"
                    size="sm"
                    width="100%"
                    background={palette.mainColor}
                    border="transparent"
                    color="#fff"
                    submit={onCompleteProfileHandler}
                  >
                    수정 완료
                  </Button>
                ) : (
                  <div className="btn_container">
                    <Button
                      type="button"
                      className="modify_btn"
                      size="sm"
                      width="100%"
                      background={palette.mainColor}
                      border="transparent"
                      color="#fff"
                      submit={onModifyProfileHandler}
                    >
                      프로필 수정
                    </Button>
                  </div>
                )}
              </StUserInfo>
            </StProfileInner>
            <MyPostWrapper />
          </StProfileWrapper>
        </div>
      </div>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  max-width: 1370px;
  width: 90%;
  padding: 4rem 0 2rem;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 1440px) {
    width: 80%;
  }
`;
const StTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin: 5rem 0 2rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 500px) {
    font-size: 1.5rem;
    margin: 2rem 0;
  }

  button {
    float: right;
    position: absolute;
    right: 0;
    top: 50%;
    padding: 8px 16px;
    color: #fff;
    width: fit-content;
    background: ${palette.mainColor};
    border: none;
    cursor: pointer;
    transform: translateY(-53%);
    color: #fff;
    border-radius: 30px;
    background-color: #47ad8e;
    width: 135px;
    height: 40px;
    font-size: 1.1rem;
    font-weight: 600;

    border-radius: 32px;

    @media (max-width: 768px) {
      padding: 6px 14px;
      height: 35px;
      width: 95px;
      font-size: 0.7rem;
      position: unset;
      transform: unset;
    }
  }
`;
const StProfileWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  gap: 0 3vw;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 4rem 0;
  }
  @media (max-width: 768px) {
    margin-top: 3rem;
    gap: 3rem 0;
  }
  .section_title {
    font-size: 1.5rem;
    font-weight: 800;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;
const StProfileInner = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 25px 0;

  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    min-width: unset;
  }
`;
const StTitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0 15px;

  .section_comment {
    font-size: 1.1rem;
    color: ${palette.mainColor};
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const StUserInfo = styled.div`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 4rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  @media (max-width: 500px) {
    padding: 2rem;
  }
  .image_container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    gap: 40px 0;
    @media (max-width: 500px) {
      gap: 20px 0;
      padding: 1rem;
    }
    img {
      height: 100%;
      width: 70%;
      aspect-ratio: 1/1;
      object-fit: contain;
    }
  }
  .nickname {
    font-size: 1.5rem;
    width: 100%;
    word-break: break-all;
    text-align: center;
    line-height: 39px;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  .btn_container {
    display: flex;
    justify-content: center;
    gap: 0 10px;
  }
`;
