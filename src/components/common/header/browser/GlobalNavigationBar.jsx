/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import styled from 'styled-components';

export default function GlobalNavigationBar(props) {
  const { children, display } = props;

  return <StListItem>{children}</StListItem>;
}

const StListItem = styled.ul`
  box-sizing: border-box;
  cursor: pointer;
  gap: 0 10px;
  align-items: center;
  position: relative;
  ul {
  }

  > li {
    position: relative;
  }

  @keyframes slideDown {
    0% {
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s;
    }
    100% {
      opacity: 1;
      transition: all 0.5s ease-in-out;
      pointer-events: auto;
    }
  }
  @keyframes slideDown {
    0% {
      opacity: 1;
      transition: all 0.5s ease-in-out;
      pointer-events: auto;
    }
    100% {
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s;
    }
  }

  ul {
    position: absolute;
  }
`;
