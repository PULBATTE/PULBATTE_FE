/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { SlTag } from 'react-icons/sl';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BrowserHeader from './BrowserHeader';
import MobileHeader from './MobileHeader';
import { palette } from '../../../styles/palette';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isReset, setIsReset] = useState(true);
  /*  console.log(isLogin); */
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem('Token');

    setIsLogin(!!token);
  }, [location]);

  return (
    <StHeader>
      <div className="header_inner">
        <BrowserHeader
          isLogin={isLogin}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <MobileHeader
          isLogin={isLogin}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </div>
    </StHeader>
  );
}

const StHeader = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background: #fff;
  padding: 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  ul {
    padding: 0;
  }
  .gnb_container {
    > ul {
      padding: 15px 0px;
    }
  }
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;
