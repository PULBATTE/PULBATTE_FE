/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

export default function LocalNavigationBar(props) {
  return (
    <StListItem
      className={
        props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'
      }
    >
      <span>{props.children}</span>
      <ul>
        <li />
      </ul>
    </StListItem>
  );
}

const StListItem = styled.li`
  &.slide-fade-in-dropdown {
    overflow: hidden;
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
  &.slide-fade-in-dropdown > ul {
    animation: slide-fade-in-dropdown-animation 0.4s ease;
  }
  &.slide-fade-out-dropdown {
    overflow: hidden;
  }
  &.slide-fade-out-dropdown > ul {
    animation: slide-fade-out-dropdown-animation 0.4s ease;
    animation-fill-mode: forwards;
  }
`;
