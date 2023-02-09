/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { SlTag } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeCookie } from '../../../apis/cookie';
import BrowserHeader from './browser/BrowserHeader';
import MobileHeader from './mobile/MobileHeader';
import { palette } from '../../../styles/palette';
import { authInstance } from '../../../apis/axios';
import { customNotify } from '../../../util/toastMessage';

export default function Header({ alarmList }) {
  const token = localStorage.getItem('access_Token');
  const navigate = useNavigate();

  const logOutEventHandler = async () => {
    const data = await authInstance.delete('api/token/deletetoken');
    if (data.status === 200) {
      removeCookie('refresh_Token');
      localStorage.removeItem('access_Token');
      customNotify.success('로그아웃 되었습니다!');
      navigate('/');
    }
  };

  const clickNaviHandler = () => {};

  return (
    <StHeader>
      <div className="header_inner">
        <BrowserHeader
          token={token}
          logOutEventHandler={logOutEventHandler}
          clickNaviHandler={clickNaviHandler}
        />
        <MobileHeader logOutEventHandler={logOutEventHandler} token={token} />
      </div>
    </StHeader>
  );
}

const StHeader = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  padding: 0 1rem;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0px 11px -4px rgb(0 0 0 / 10%);
  z-index: 2;
  ul {
  }

  @media (max-width: 768px) {
    position: fixed;
    padding: 0 2rem;
  }
`;
