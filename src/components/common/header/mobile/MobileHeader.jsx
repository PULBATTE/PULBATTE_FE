/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import { BsBellFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import SlideModal from './SlideModal';
import alarmBtn from '../../../../assets/image/icon_alarm.png';

export default function Mobileheader({ token, logOutEventHandler }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const onClickModalHandler = () => {
    setIsClicked(!isClicked);
    isOpen
      ? (document.body.style.overflowY = 'visible')
      : (document.body.style.overflowY = 'hidden');
  };
  return (
    <StMobileNav>
      <div>
        <Link to="/">
          <img src="" alt="" />
          로고
        </Link>
      </div>
      <StUtilMenu>
        <StAlarm src={alarmBtn} />
        <div
          className="hamburger"
          onClick={() => {
            onClickModalHandler();
          }}
        >
          <i className={isClicked ? 'line open' : 'line close'} />
          <i className={isClicked ? 'line open' : 'line close'} />
          <i className={isClicked ? 'line open' : 'line close'} />
        </div>
      </StUtilMenu>
      <StCurtain className={isClicked ? 'curtain open' : 'curtain'} />
      <SlideModal
        isClicked={isClicked}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        token={token}
        onClickModalHandler={onClickModalHandler}
        logOutEventHandler={logOutEventHandler}
      />
    </StMobileNav>
  );
}
const StMobileNav = styled.div`
  height: 50.5px;
  align-items: center;
  justify-content: space-between;
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 7px 0;
    cursor: pointer;
    position: relative;
    .line {
      height: 4px;
      width: 1.9rem;
      display: block;
      background: black;
      border-radius: 5px;
    }
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
const StAlarm = styled.img`
  width: 25px;
  aspect-ratio: 1/1.1;
  cursor: pointer;
  image-rendering: -webkit-optimize-contrast;
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
