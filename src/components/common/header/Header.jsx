import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import '../../../styles/fonts.css';
import LocalNavigationBar from './LocalNavigationBar';

export default function Header() {
  const [dropdown, setDropdown] = useState(false);
  return (
    <StHeader>
      <div className="header_inner">
        <StImageContainer>
          <img src="" alt="" />
          로고
        </StImageContainer>
        <StCategory>
          <LocalNavigationBar visibility={dropdown}>
            커뮤니티
          </LocalNavigationBar>
          <LocalNavigationBar visibility={dropdown}>
            식물검색
          </LocalNavigationBar>

          <li>
            <span onMouseEnter={() => setDropdown(!dropdown)}>
              나만의 반려식물 찾기
            </span>
            {dropdown ? (
              <ul>
                <li>식집사 유형 검사</li>
                <li>도전 키워보기</li>
              </ul>
            ) : (
              ''
            )}
          </li>
          <li>
            <span>식물 일지</span>
          </li>
        </StCategory>
        <StUtilContainer>
          <Button width="fit-content" size="sm" background="#fff">
            알림
          </Button>
          <Button width="fit-content" size="sm" background="#fff">
            로그인
          </Button>
        </StUtilContainer>
      </div>
    </StHeader>
  );
}
const StHeader = styled.header`
  max-width: 1372px;
  width: 95%;
  margin: 0 auto;
  @media (max-width: 768px) {
    display: none;
  }
  .header_inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @keyframes slide-fade-in-dropdown-animation {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }
  @keyframes slide-fade-out-dropdown-animation {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-100%);
    }
  }
`;

const StImageContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
`;
const StCategory = styled.div`
  display: flex;
  list-style: none;
  overflow: hidden;
  li {
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;

    > span {
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
`;
const StUtilContainer = styled.div`
  display: flex;
`;
