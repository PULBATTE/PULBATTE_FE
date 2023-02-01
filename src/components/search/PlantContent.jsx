import React from 'react';

import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function PlantContent({ plantInfo }) {
  return (
    <StContentWrapper>
      <StContentTitle>
        <span className="plant_name">{plantInfo && plantInfo?.plantName}</span>
        <StFilterBtnContainer>
          {plantInfo && plantInfo?.beginner == 0 && (
            <button type="button">#초보자용</button>
          )}
          {plantInfo && plantInfo?.plantTag == 'cactus' && (
            <button type="button">#다육/선인장</button>
          )}
          {plantInfo && plantInfo?.plantTag == 'leaf' && (
            <button type="button">#잎이 있는</button>
          )}

          {plantInfo && plantInfo?.plantTag == 'flower' && (
            <button type="button">#꽃이 있는</button>
          )}

          {plantInfo && plantInfo?.plantTag == 'fruit' && (
            <button type="button">#열매가 있는</button>
          )}
        </StFilterBtnContainer>
      </StContentTitle>

      <StExplanation>
        <span className="section_title">식물 더 알아보기</span>
        <span>{plantInfo?.content}</span>
      </StExplanation>
    </StContentWrapper>
  );
}
const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem 0;
  width: 55%;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
  }
  @media (max-width: 768px) {
    gap: 2rem 0;
  }
  .plant_name {
    font-size: 2.2rem;
    font-weight: 800;
    @media (max-width: 500px) {
      font-size: 1.2rem;
      padding: 0;
    }
  }
`;
const StFilterBtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 5px;
  button {
    font-size: 1.3rem;
    padding: 6px 20px;
    border-radius: 20px;
    border: none;
    border: 1px solid ${palette.mainColor};
    color: ${palette.mainColor};
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const StContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding-bottom: 2.5rem;
  padding-top: 10px;
  border-bottom: 1px solid ${palette.borderColor1};
  @media (max-width: 1024px) {
    border-top: none;
  }
  @media (max-width: 500px) {
    padding-top: 15px;
    padding-bottom: 28px;
  }
`;
const StExplanation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  span {
    &.section_title {
      font-weight: 800;
    }
    font-size: 1.2rem;
    line-height: 2rem;
    letter-spacing: 0.5px;

    @media (max-width: 500px) {
      font-size: 0.9rem;
      line-height: 20px;
    }
  }
`;
