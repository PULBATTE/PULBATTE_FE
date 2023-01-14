import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsBellFill } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/fonts.css';
import GlobalNavigationBar from './GlobalNavigationBar';

export default function BrowserHeader({
  isLogin,
  setIsOpen,
  isOpen,
  setIsReset,
  isReset,
}) {
  console.log(isLogin);

  const navigate = useNavigate();

  const logOutEventHandler = () => {
    console.log('ok');
    setIsReset(false);
    localStorage.removeItem('Token');
    alert('로그아웃 되었습니다!');
    navigate('/');
  };

  return (
    <StBrowserNav>
      <StImageContainer>
        <img src="" alt="" />
        로고
      </StImageContainer>
      <StCategory
        className={isReset ? 'on' : 'off'}
        onClick={() => setIsReset(!isReset)}
      >
        <div className="gnb_container">
          <ul>
            <li>
              <span>커뮤니티</span>
            </li>
          </ul>
        </div>
        <div className="gnb_container">
          <ul>
            <li>
              <span>식물검색</span>
            </li>
          </ul>
        </div>
        <div className="gnb_container">
          <GlobalNavigationBar setIsOpen={setIsOpen} isOpen={isOpen}>
            <li>
              <span>나만의 반려식물 찾기</span>
              <StNavigation>
                <li>
                  <span>식집사 테스트</span>
                </li>
                <li>
                  <span>식집사 가이드</span>
                </li>
              </StNavigation>
            </li>
          </GlobalNavigationBar>
        </div>
      </StCategory>
      <StUtilContainer>
        <StAlarm />
        {isLogin ? (
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
