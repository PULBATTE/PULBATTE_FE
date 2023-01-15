/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { SlTag } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import BrowserHeader from './BrowserHeader';
import MobileHeader from './mobile/MobileHeader';
import { palette } from '../../../styles/palette';

export default function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get('Token');

  const navigate = useNavigate();

  const logOutEventHandler = () => {
    const cookie = new Cookies();
    cookie.remove('Token');

    alert('로그아웃 되었습니다!');
    navigate('/');
  };

  return (
    <StHeader>
      <div className="header_inner">
        <BrowserHeader
          token={token}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          logOutEventHandler={logOutEventHandler}
        />
        <MobileHeader
          token={token}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          logOutEventHandler={logOutEventHandler}
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
