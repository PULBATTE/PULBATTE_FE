import React from 'react';
import { BsSun } from 'react-icons/bs';
import { GiWateringCan } from 'react-icons/gi';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { RiTempHotLine } from 'react-icons/ri';
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

      <StTipContainer>
        <span>Tip</span>
        <StTipGrid>
          <div>
            <RiTempHotLine />
            <span className="category_type">{plantInfo?.tempType}</span>
            <span className="category_text">{plantInfo?.temp}</span>
          </div>
          <div>
            <GiWateringCan />
            <span className="category_type">{plantInfo?.humidityType}</span>
            <span className="category_text">{plantInfo?.humidity}</span>
          </div>
          <div>
            <BsSun />
            <span className="category_type">{plantInfo?.sunshineType}</span>
            <span className="category_text">{plantInfo?.sunshine}</span>
          </div>
          <div>
            <MdOutlineWaterDrop />
            <span className="category_type">{plantInfo?.waterType}</span>
            <span className="category_text">{plantInfo?.water}</span>
          </div>
        </StTipGrid>
      </StTipContainer>
      <StExplanation>
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
    cursor: pointer;
  }
`;
const StTipContainer = styled.div`
  > span {
    margin-bottom: 30px;
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
  }
`;
const StTipGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid ${palette.borderColor1};
  border-bottom: 1px solid ${palette.borderColor1};
  svg {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  .category_type {
    font-size: 1.3rem;
    font-weight: 700;
  }
  .category_text {
    font-size: 1.2rem;
  }
  > div {
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px 0;
    &:first-child {
      border-bottom: 1px solid ${palette.borderColor1};
    }
    &:nth-child(2) {
      border-bottom: 1px solid ${palette.borderColor1};
    }
    &:nth-child(2n-1) {
      border-right: 1px solid ${palette.borderColor1};
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
    padding-top: 0;
    padding-bottom: 25px;
  }
`;
const StExplanation = styled.div`
  span {
    font-size: 1.3rem;
    line-height: 2rem;
    @media (max-width: 500px) {
      font-size: 1rem;
      line-height: 20px;
    }
  }
`;
