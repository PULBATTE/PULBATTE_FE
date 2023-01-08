/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import { BsBellFill } from 'react-icons/bs';

export default function Mobileheader() {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModalHandler = () => {
    setIsOpen(!isOpen);
    isOpen
      ? (document.body.style.overflowY = 'visible')
      : (document.body.style.overflowY = 'hidden');
  };
  return (
    <div>
      <StMobileNav>
        <div>로고</div>
        <StUtilMenu>
          <StAlarm />

          <div
            className="hamburger"
            onClick={() => {
              onClickModalHandler();
            }}
          >
            <i className={isOpen ? 'line open' : 'line close'} />
            <i className={isOpen ? 'line open' : 'line close'} />
            <i className={isOpen ? 'line open' : 'line close'} />
          </div>
        </StUtilMenu>
        <StCurtain className={isOpen ? 'curtain open' : 'curtain'} />
        <StModal className={isOpen ? 'open' : ''}>
          <div className="modal_inner">
            <div>
              <button type="button">로그인</button>
              <span>환영합니다.</span>
            </div>
          </div>
        </StModal>
      </StMobileNav>
    </div>
  );
}
const StMobileNav = styled.div`
  height: 60px;
  align-items: center;
  justify-content: space-between;
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 7px 0;
    cursor: pointer;
    position: relative;
  }
  .line {
    height: 4px;
    width: 1.9rem;
    display: block;
    background: black;
    border-radius: 5px;
  }
`;
const StUtilMenu = styled.div`
  display: flex;
  gap: 0 15px;
  align-items: center;
  .line {
    transition: all 0.2s ease-in-out;
  }
  .open {
    z-index: 5;
  }
  .open:nth-child(1) {
    transform: rotate(44deg) translate(9px, 7px);
    background: #d27676;
  }
  .open:nth-child(2) {
    opacity: 0;
  }
  .open:nth-child(3) {
    transform: rotate(-47deg) translate(9px, -6px);
    background: #d27676;
  }
`;
const StAlarm = styled(BsBellFill)`
  font-size: 1.7rem;
  color: rgba(228 206 103);
  cursor: pointer;
`;
const StCurtain = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  &.open {
    display: block;
  }
`;

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
    padding: 2rem;
    padding-top: 60px;
    box-sizing: border-box;
    height: 100vh;
  }
`;
