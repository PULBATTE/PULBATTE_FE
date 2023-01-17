/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { palette } from '../../../../styles/palette';
import {
  guidePath,
  boardPath,
  searchPath,
  diaryPath,
} from '../../../../apis/path';
import PrivateRoute from '../../../../routes/PrivateRoute';
import { authInstance } from '../../../../apis/axios';

export default function SlideModal({
  isClicked,
  setIsOpen,
  token,
  isOpen,
  onClickModalHandler,
  logOutEventHandler,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      authInstance
        .get('https://pulbatte.com/api/auth/info')
        .then(response => setUserData(response.data))
        .catch(error => console.log(error));
    }
  }, [location]);
  return (
    <StModal className={isClicked ? 'open' : ''}>
      <div className="modal_inner">
        <div className="logo_container">
          <img
            src="https://blog.kakaocdn.net/dn/ulsAm/btqB9w2kuwz/o2cNKALorND83K2rrZ9YF1/img.jpg"
            alt="로고이미지"
          />
        </div>
        {token && userData && userData ? (
          <div className="modal_user_info">
            <div className="user_image">
              {userData && userData.profileImage !== null ? (
                <img src={userData?.profileImage} alt="유저 이미지" />
              ) : (
                ''
              )}
            </div>
            <span className="user_name">{userData && userData.nickName}</span>
            <span className="comming_message">풀밭에 오신걸 환영해요!</span>
          </div>
        ) : (
          <div className="modal_user_info">
            <div className="user_image" />
            <span className="user_name">게스트</span>
            <span className="comming_message">풀밭에 오신걸 환영해요!</span>
          </div>
        )}
        <StCategory>
          {token && (
            <div className="gnb">
              <span>마이페이지</span>
            </div>
          )}
          <div className="line" />
          <div className="gnb">
            <span
              onClick={() => {
                navigate(searchPath);
                onClickModalHandler();
              }}
              aria-hidden="true"
            >
              식물 찾아보기
            </span>
          </div>
          <div className="gnb">
            <span
              onClick={() => {
                navigate(boardPath);
                onClickModalHandler();
              }}
              aria-hidden="true"
            >
              커뮤니티
            </span>
          </div>
          <div
            className={isOpen ? 'gnb close' : 'gnb open'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>
              나만의 반려식물 찾기 <MdKeyboardArrowRight />
            </span>
            <ul className="lnb">
              <li>
                <span
                  onClick={() => PrivateRoute(guidePath)}
                  aria-hidden="true"
                >
                  식집사 테스트
                </span>
              </li>
              <li>
                <span
                  onClick={() => PrivateRoute(guidePath)}
                  aria-hidden="true"
                >
                  식집사 가이드
                </span>
              </li>
            </ul>
          </div>
          <div className="gnb">
            <span onClick={() => PrivateRoute(diaryPath)} aria-hidden="true">
              식물 일지
            </span>
          </div>
          <div className="line" />
          <StUtilContainer>
            {token && token ? (
              <button
                type="button"
                onClick={() => {
                  logOutEventHandler();
                  onClickModalHandler();
                }}
              >
                로그아웃
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigate(`/api/user/signin?redirectUrl=${location.pathname}`);
                  onClickModalHandler();
                }}
              >
                로그인
              </button>
            )}
          </StUtilContainer>
        </StCategory>
      </div>
    </StModal>
  );
}
const StModal = styled.div`
  position: fixed;
  top: 0;
  right: -100%;
  height: 100vh;
  width: 100%;

  transition: all 0.5s ease-in-out;
  &.open {
    right: 0;
  }
  .modal_inner {
    position: absolute;
    width: 90%;
    top: 0;
    background: #fff;
    right: 0;
    padding: 0 1rem;
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .logo_container {
      display: flex;
      height: 50.5px;
      align-items: center;
      img {
        width: 80px;
      }
    }
    .modal_user_info {
      display: flex;
      flex-direction: column;
      gap: 2px 0;
    }
    .user_name {
      font-size: 1.3rem;
      font-weight: 600;
      margin-top: 5px;
    }
    .comming_message {
      color: ${palette.mainColor};
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
  .user_image {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
`;
const StCategory = styled.div`
  .gnb {
    margin: 20px 0;
    overflow: hidden;

    span {
      font-size: 1.2rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0 10px;
    }
    @keyframes slideDown {
      0% {
        opacity: 0;
        pointer-events: none;
        transition: all 0.5s;
        margin: -27px 0;
      }
      100% {
        opacity: 1;
        transition: all 0.5s ease-in-out;
        pointer-events: auto;
        height: 100%;
      }
    }
    @keyframes slideUp {
      0% {
        opacity: 1;
        transition: all 0.5s ease-in-out;
        pointer-events: auto;
        height: 100%;
      }
      85% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        height: 1%;
        pointer-events: none;
        margin: -27px 0;
      }
    }
    &.open {
      svg {
        transform: rotate(90deg);
      }
      .lnb {
        animation: slideDown 0.5s ease-in-out forwards;
      }
    }
    &.close {
      .lnb {
        animation: slideUp 0.5s ease-in-out forwards;
      }
    }
    .lnb {
      display: flex;
      flex-direction: column;
      gap: 10px 0;
      padding-left: 10px;
      margin-bottom: 0;
      li {
        span {
          text-decoration: none;
          color: #777777;
          font-size: 1.1rem;
          font-weight: 500;
        }
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: ${palette.borderColor2};
    margin: 20px 0;
  }
`;
const StUtilContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    line-height: 1;
    border: none;
    font-size: 1.2rem;
    padding: 0;
    color: ${palette.textColor1};
    cursor: pointer;
  }
`;
