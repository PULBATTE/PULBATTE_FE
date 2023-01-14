/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

export default function Modal(props) {
  const { modal, width, height, submit, header, button } = props;

  return (
    <StModalContainer className={modal ? 'modal open' : 'modal'}>
      <StCurtain />
      <StModalInner width={width} height={height} className="modal_inner">
        <StContent>
          {props.children}
          {button && (
            <div className="modal_footer">
              <Button width="80px" size="sm" type="button" onClick={submit}>
                {button}
              </Button>
            </div>
          )}
        </StContent>
      </StModalInner>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  display: none;
  min-height: 100vh;
  &.open {
    display: block;
  }
  .modal_footer {
    display: flex;
    justify-content: flex-end;
  }
  @keyframes open {
    0% {
      opacity: 0;
      transform: translate(-50%, -20%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const StModalInner = styled.div`
  background: #fff;
  max-width: ${props => props.width || 'auto'};
  max-height: ${props => props.height || '95%'};
  border-radius: 5px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 90%;
  left: 50%;
  top: 50%;
  z-index: 3;
  transform-origin: 0 100%;
  animation: open ease-in-out 0.3s forwards;
`;
const StCurtain = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
`;

const StContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px 0;
  padding: 2rem;
  height: inherit;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StButton = styled.button`
  background: none;
  border: none;
  min-width: 85px;
  height: 30px;
  border-radius: 3px;
  cursor: pointer;

  &:active {
    box-shadow: none;
  }
`;
