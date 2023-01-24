import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

/**
 *
 * @param {number} rating
 * @param {number}
 * @returns {number[]}
 */
function makeRatingArr(rating, maxRating = 5) {
  const arr = [];
  for (let i = 0; i < maxRating; i += 1) {
    if (i < rating) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;
}

export default function PlantEnv({
  title,
  src,
  checkPoint,
  name,
  isDisabled = true,
  handler,
  gap,
  appendText,
  afterText,
}) {
  const ratingArr = makeRatingArr(checkPoint);

  const onChangeRating = e => {
    const { value } = e.target;
    handler(value);
  };

  return (
    <StGridList>
      <StTitleWrapper>
        <img src={src} alt="식물환경 아이콘" />
        <p>{title}</p>
      </StTitleWrapper>
      <StCircleContainer gap={gap}>
        <span>{appendText}</span>
        {ratingArr.map((v, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`rating_${i}`}>
            <label htmlFor={i}>
              <input
                id={i}
                type="checkbox"
                disabled={isDisabled}
                value={i + 1}
                checked={v}
                readOnly
                onChange={onChangeRating}
              />
              <StSpan className={`circle circle_${name}`} id={`${i}`} />
            </label>
          </div>
        ))}
        <span>{afterText}</span>
      </StCircleContainer>
    </StGridList>
  );
}
const StGridList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 1rem 0;
  @media (max-width: 768px) {
    gap: 0.5rem 0;
    align-items: center;
  }
  span {
    font-size: 1.1rem;
  }
  label {
    position: relative;
  }

  input {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
  }
  .circle {
    width: 13px;
    height: 13px;
    display: block;
    background: ${palette.borderColor1};
    border-radius: 50%;
    border: none;
  }
  input:checked + .circle_sunny {
    background: #f5bd67;
  }
  input:checked + .circle_water {
    background: #8fd2f8;
  }
  input:checked + .circle_air {
    background: #9db5da;
  }
`;

const StTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  p {
    font-size: 1.2rem;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;
const StCircleContainer = styled.div`
  display: flex;

  align-items: center;
  gap: ${props => (props.gap ? props.gap : '10px')};
`;
const StSpan = styled.span`
  background: ${props => props.background};
  position: relative;
  &.circle {
    width: 17px;
    height: 17px;
    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }
  pointer-events: none;
`;
