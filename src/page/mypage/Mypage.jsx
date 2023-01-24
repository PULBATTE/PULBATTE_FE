import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function Mypage() {
  return (
    <StWrapper>
      <div className="main_banner">
        <div className="banner_inner" />
      </div>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  max-width: 1100px;
  width: 90%;
  margin: 7rem auto 3rem;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
const StTitle = styled.div`
  text-align: center;
  position: relative;
  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.8rem;
      margin: 0;
    }
  }
  @media (max-width: 500px) {
    display: flex;
    justify-content: space-between;
  }
  button {
    float: right;
    position: absolute;
    right: 0;
    top: 50%;
    padding: 8px 16px;
    color: #fff;
    width: fit-content;
    background: ${palette.mainColor};
    border: none;
    cursor: pointer;
    transform: translateY(-53%);
    color: #fff;
    border-radius: 30px;
    background-color: #47ad8e;
    width: 135px;
    height: 45px;
    font-size: 1.1rem;
    font-weight: 600;

    border-radius: 32px;

    @media (max-width: 768px) {
      padding: 6px 14px;
      height: 35px;
      width: 95px;
      font-size: 0.7rem;
      position: unset;
      transform: unset;
    }
  }
`;
const StPageInner = styled.div`
  margin-top: 3rem;
`;
