import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import testImage from '../../assets/image/test_01.png';
import { palette } from '../../styles/palette';

export default function PlantSlide({
  title,
  questionA,
  questionB,
  checkQuestionHandler,
}) {
  return (
    <div className="slide_inner">
      <span className="question_title">{title}</span>
      <div className="slide_image_container">
        <img src={testImage} alt="" />
      </div>
      <StQuestionContainer>
        <div
          className="next"
          onClick={() => checkQuestionHandler('0')}
          aria-hidden="true"
        >
          <span className="first_question">A</span>
          <span className="second_question">{questionA}</span>
        </div>
        <div
          className="next"
          onClick={() => checkQuestionHandler('1')}
          aria-hidden="true"
        >
          <span className="first_question">B</span>
          <span className="second_question">{questionB}</span>
        </div>
      </StQuestionContainer>
    </div>
  );
}
const StQuestionContainer = styled.div`
  display: flex;
  gap: 0 30px;
  box-sizing: border-box;
  width: 100%;
  justify-content: center;
  pointer-events: visible;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    min-height: 18vh;
    background: #fff;
    border-radius: 15px;
    gap: 20px 0;
    width: 40%;
    cursor: pointer;
    &:active {
      background: red;
    }
  }
  .first_question {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${palette.mainColor};
  }
  .second_question {
    font-size: 1rem;
    font-weight: 400;
  }
`;
