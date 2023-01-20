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
        <span>{title}</span>
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

  gap: 10px 0;
  span {
    font-size: 14px;
    color: ${palette.textColor1};
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
  gap: 8px;
`;
const StCircleContainer = styled.div`
  display: flex;
  gap: ${props => (props.gap ? props.gap : '10px')};
`;
const StSpan = styled.span`
  background: ${props => props.background};
  position: relative;
  pointer-events: none;
`;
