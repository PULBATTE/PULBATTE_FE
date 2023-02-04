import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';

export default function PlantSlide({
  title,
  image,
  questionA,
  questionB,
  checkQuestionHandler,
  isChecked,
}) {
  return (
    <div className="slide_inner">
      <span className="question_title">{title}</span>
      <div className="slide_image_container">
        <img src={image} alt="" />
      </div>
      <StQuestionContainer>
        <div
          className={isChecked ? 'next off' : 'next on'}
          onClick={() => checkQuestionHandler('0')}
          aria-hidden="true"
        >
          <span className="first_question">A</span>
          <span className="second_question">{questionA}</span>
        </div>
        <div
          className={isChecked ? 'next off' : 'next on'}
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
  padding: 4px;
  @media (max-width: 500px) {
    gap: 0 10px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    min-height: 15vh;
    background: ${palette.pageBackgroundGray};
    border-radius: 15px;
    gap: 20px 0;
    width: 40%;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    &:active {
      background: #abc8b2;
      .second_question {
        color: #fff;
        font-weight: 800;
      }
    }
    @media (max-width: 768px) {
      gap: 7px 0;
    }
  }
  .on {
    pointer-events: fill;
  }
  .off {
    pointer-events: none;
  }
  .first_question {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${palette.mainColor};
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
  .second_question {
    font-size: 1.2rem;
    font-weight: 400;
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;
