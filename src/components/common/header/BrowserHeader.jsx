import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsBellFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/fonts.css';
import GlobalNavigationBar from './GlobalNavigationBar';
import {
  guidePath,
  boardPath,
  searchPath,
  diaryPath,
} from '../../../apis/path';
import PrivateRoute from '../../../routes/PrivateRoute';

export default function BrowserHeader({
  token,
  setIsOpen,
  isOpen,
  logOutEventHandler,
}) {
  const navigate = useNavigate();
  return (
    <StBrowserNav>
      <StImageContainer>
        <Link to="/">
          <img src="" alt="" />
          로고
        </Link>
      </StImageContainer>
      <StCategory>
        <div className="gnb_container">
          <ul>
            <li>
              <span onClick={() => navigate(boardPath)} aria-hidden="true">
                커뮤니티
              </span>{' '}
            </li>
          </ul>
        </div>
        <div className="gnb_container">
          <ul>
            <li>
              <span onClick={() => navigate(searchPath)} aria-hidden="true">
                식물 찾아보기
              </span>
            </li>
          </ul>
        </div>
        <div className="gnb_container">
          <GlobalNavigationBar setIsOpen={setIsOpen} isOpen={isOpen}>
            <li>
              <span>나만의 반려식물 찾기</span>
              <StNavigation>
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
              </StNavigation>
            </li>
          </GlobalNavigationBar>
        </div>
        <div className="gnb_container">
          <ul>
            <li>
              <span onClick={() => navigate(diaryPath)} aria-hidden="true">
                식물 일지
              </span>
            </li>
          </ul>
        </div>
      </StCategory>
      <StUtilContainer>
        <StAlarm />
        {token ? (
          <button type="button" onClick={() => logOutEventHandler()}>
            로그아웃
          </button>
        ) : (
          <StLink to="/api/user/signin">
            <button type="button">로그인</button>
          </StLink>
        )}
      </StUtilContainer>
    </StBrowserNav>
  );
}

const StBrowserNav = styled.div`
  display: flex;
  align-items: center;
  height: 50.5px;
  justify-content: space-between;
  max-width: 1372px;
  margin: 0 auto;
  width: 80%;
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
`;
const StCategory = styled.ul`
  display: flex;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: pointer;
  gap: 0 20px;

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
`;

const StUtilContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    line-height: 1;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
`;
const StAlarm = styled(BsBellFill)`
  color: rgba(228 206 103);
  font-size: 1.7rem;
`;
const StLink = styled(Link)`
  min-width: fit-content;
`;
const StNavigation = styled.ul`
  display: flex;
  gap: 0 10px;
  display: none;
  a {
    color: #000;
    text-decoration: none;
  }
  li {
    font-size: 0.9rem;
    &:hover {
      font-weight: 600;
    }
  }
  &.open > ul {
    display: flex;
  }
  &.close > ul {
    /*     display: none; */
  }
  .navibar {
    position: fixed;
    top: 50px;
    left: 0;
    height: 60px;
    background: #cbcbcb;
    width: 100vw;
  }

  &.close .navibar {
    /*   display: none; */
  }
`;
