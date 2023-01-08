/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { SlTag } from 'react-icons/sl';
import styled from 'styled-components';
import BrowserHeader from './BrowserHeader';
import MobileHeader from './MobileHeader';

export default function Header() {
  return (
    <StHeader>
      <div className="header_inner">
        <BrowserHeader />
        <MobileHeader />
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
