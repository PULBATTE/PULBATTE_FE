import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsBellFill } from 'react-icons/bs';
import { useSelector, useDispatch, useNavigate, Link } from 'react-router-dom';
import Button from '../Button';
import '../../../styles/fonts.css';
import GlobalNavigationBar from './GlobalNavigationBar';
import NavigationList from './NavigationList';

export default function BrowserHeader() {
  const [isReset, setIsReset] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
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
              <NavigationList>
                <li>
                  <span>식집사 유형 검사</span>
                </li>
                <li>
                  <span>도전키워보기</span>
                </li>
              </NavigationList>
            </li>
          </GlobalNavigationBar>
        </div>
      </StCategory>
      <StUtilContainer>
        <StAlarm />

        <StLink to="/api/user/signin">
          <Button width="fit-content" size="sm" background="#fff">
            로그인
          </Button>
        </StLink>
      </StUtilContainer>
    </StBrowserNav>
  );
}

const StBrowserNav = styled.div`
  display: flex;
  align-items: center;

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
  }
`;
const StAlarm = styled(BsBellFill)`
  color: rgba(228 206 103);
  font-size: 1.7rem;
`;
const StLink = styled(Link)`
  min-width: fit-content;
`;
