/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  }, []);
  return (
    <StModal className={isClicked ? 'open' : ''}>
      <div className="modal_inner">
        <div className="logo_container">
          <img
            src="https://blog.kakaocdn.net/dn/ulsAm/btqB9w2kuwz/o2cNKALorND83K2rrZ9YF1/img.jpg"
            alt="로고이미지"
          />
        </div>
        {token ? (
          <div className="modal_user_info">
            <div className="user_image">
              {userData && userData ? (
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
            <div className="user_image">
              <img
                src="data:image/jpeg;base64,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"
                alt="유저 이미지"
              />
            </div>
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
            {token ? (
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
const StLink = styled(Link)`
  min-width: fit-content;
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
