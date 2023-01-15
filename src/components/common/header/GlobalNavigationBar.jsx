/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import styled from 'styled-components';

export default function GlobalNavigationBar(props) {
  const { children, isOpen, setIsOpen } = props;
  return (
    <StListItem
      className={isOpen ? 'close' : 'open'}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </StListItem>
  );
}

const StListItem = styled.ul`
  padding: 0;
  box-sizing: border-box;
  cursor: pointer;
  gap: 0 10px;
  align-items: center;

  > li {
    position: relative;
  }
  &.open {
    display: block;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: grey;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 5px;
      animation: width 0.3s ease-in-out forwards;
    }
    @keyframes width {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }
    ul {
      display: flex;
    }
  }
  &.close {
    /*  display: none; */
  }
  > span {
    font-size: 0.9rem;
    font-weight: 600;
  }
  ul {
    width: 100%;

    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-70%);
    li {
      min-width: fit-content;
    }
  }
`;
