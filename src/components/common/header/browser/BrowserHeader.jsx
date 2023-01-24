/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsBellFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../../../styles/fonts.css';
import GlobalNavigationBar from './GlobalNavigationBar';
import Logo from '../../../../assets/image/logo.png';
import {
  guidePath,
  boardPath,
  searchPath,
  diaryPath,
  testPath,
  choicePath,
} from '../../../../apis/path';
import PrivateRoute from '../../../../routes/PrivateRoute';

export default function BrowserHeader({ token, logOutEventHandler }) {
  const [display, setDisplay] = useState([false, false, false, false, false]);
  const [clickBtn, setClickBtn] = useState(false);
  const location = useLocation();

  const outMouseDisplayHandler = index => {
    const newDisplay = [...display];
    newDisplay[index] = false;
    setDisplay(newDisplay);
  };
  const inMouseDisplayHandler = index => {
    const newDisplay = [...display];
    newDisplay[index] = true;
    setDisplay(newDisplay);
  };
  const navigate = useNavigate();
  return (
    <StBrowserNav>
      <StImageContainer>
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </StImageContainer>
      <StCategory>
        <div className="gnb_container">
          <ul
            onMouseOver={() => inMouseDisplayHandler(0)}
            onMouseOut={() => outMouseDisplayHandler(0)}
          >
            <li>
              <span
                onClick={() => navigate(boardPath)}
                aria-hidden="true"
                /*   display={display[1]} */
              >
                커뮤니티
              </span>
            </li>
          </ul>
        </div>
        <div className="gnb_container">
          <ul
            onMouseOver={() => inMouseDisplayHandler(1)}
            onMouseOut={() => outMouseDisplayHandler(1)}
          >
            <li>
              <span onClick={() => navigate(searchPath)} aria-hidden="true">
                식물 찾아보기
              </span>
            </li>
          </ul>
        </div>
        <div
          className="gnb_container"
          onMouseOver={() => inMouseDisplayHandler(2)}
          onMouseOut={() => outMouseDisplayHandler(2)}
        >
          <GlobalNavigationBar>
            <li>
              <span>나만의 반려식물 찾기</span>
              <StNavigation display={display[2]}>
                <li onClick={() => PrivateRoute(testPath)} aria-hidden="true">
                  <span aria-hidden="true">식집사 테스트</span>
                </li>
                <li onClick={() => PrivateRoute(guidePath)} aria-hidden="true">
                  <span>식집사 가이드</span>
                </li>
              </StNavigation>
            </li>
          </GlobalNavigationBar>
        </div>
        <div className="gnb_container">
          <ul
            onMouseOver={() => inMouseDisplayHandler(3)}
            onMouseOut={() => outMouseDisplayHandler(3)}
          >
            <li>
              <span onClick={() => PrivateRoute(diaryPath)} aria-hidden="true">
                식물 일지
              </span>
            </li>
          </ul>
        </div>
      </StCategory>

      {token && token ? (
        <StUtilContainer>
          <StAlarm />
          <StMyBtnContainer>
            <StMyBtn onClick={() => setClickBtn(!clickBtn)} />
            <ul className={clickBtn ? 'mypage_modal open' : 'mypage_modal'}>
              <li>
                <span>마이페이지</span>
              </li>
              <li>
                <span
                  onClick={() => {
                    logOutEventHandler();
                    setClickBtn(!clickBtn);
                  }}
                  aria-hidden="true"
                >
                  로그아웃
                </span>
              </li>
            </ul>
          </StMyBtnContainer>
        </StUtilContainer>
      ) : (
        <StUtilContainer>
          <StLink to="/api/user/signin">
            <button
              type="button"
              onClick={() => {
                navigate(`/api/user/signin?redirectUrl=${location.pathname}`);
              }}
            >
              로그인
            </button>
          </StLink>
        </StUtilContainer>
      )}
    </StBrowserNav>
  );
}

const StBrowserNav = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  justify-content: space-between;
  max-width: 1372px;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 1440px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const StImageContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  a {
    text-decoration: none;
    color: #000;
  }
  img {
    @media (max-width: 1000px) {
      width: 13vw;
    }
  }
`;
const StCategory = styled.ul`
  display: flex;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: pointer;
  gap: 0 20px;
  .gnb_container {
    position: relative;
    &:hover {
      &:before {
        position: absolute;
        content: '';
        bottom: 0;
        width: 100%;
        height: 4px;
        background: #4c4c4c;
        border-radius: 20px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        animation: width 0.4s ease-in-out forwards;
      }
    }
    > ul {
      padding: 15px 0;
      position: relative;
      > li {
        > span {
          font-size: 1.2rem;
          @media (max-width: 1024px) {
            font-size: 1.1rem;
          }
        }
      }
    }
  }
  > div {
    position: relative;
  }
  > li {
    padding: 5px 10px;
  }
  @keyframes width {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
  @media (max-width: 1000px) {
    gap: 0 10px;
  }
`;

const StUtilContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  button {
    line-height: 1;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 1rem;
  }
  svg {
    cursor: pointer;
  }
`;
const StAlarm = styled(BsBellFill)`
  color: rgba(228 206 103);
  font-size: 1.7rem;
`;
const StMyBtnContainer = styled.div`
  position: relative;
  .mypage_modal {
    position: absolute;
    width: 150px;
    top: 40px;
    left: -30%;
    transform: translateX(-30%);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 15px;
    margin: 0;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 0 5px 1px rgb(0 0 0 / 15%);
    transition: all 0.2s ease-in;
    &.open {
      opacity: 1;
      pointer-events: fill;
    }
    li {
      padding: 10px;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      border-radius: 6px;
      &:hover {
        background: #eeeeee;
      }
    }
  }
`;
const StMyBtn = styled(FaUserCircle)`
  font-size: 1.7rem;
`;
const StLink = styled(Link)`
  min-width: fit-content;
`;
const StNavigation = styled.ul`
  position: absolute;
  top: 38px;
  left: 50%;
  box-shadow: 0 0 5px 1px rgb(0 0 0 / 15%);
  border-radius: 15px;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  pointer-events: ${props => (props.display ? 'auto' : 'none')};
  opacity: ${props => (props.display ? '1' : '0')};
  transition: all 0.3s ease-in-out;

  ul {
    li {
    }
  }

  a {
    color: #000;
    text-decoration: none;
  }
  li {
    &:hover {
      background: #eeeeee;
    }
    font-size: 0.9rem;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    position: relative;
  }

  .navibar {
    position: fixed;
    top: 50px;
    left: 0;
    height: 60px;
    background: #cbcbcb;
    width: 100vw;
  }
`;
