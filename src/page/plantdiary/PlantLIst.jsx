import React from 'react';
import styled from 'styled-components';
import PlantListCard from '../../components/plantdiary/PlantListCard';

export default function PlantList() {
  return (
    <StPlantListContainer>
      <h1>식물일지</h1>
      <StPlantDiaryContainer>
        <StPlantHeader>
          <h3>식물리스트</h3>
          <StAddButton type="button">식물 추가하기</StAddButton>
        </StPlantHeader>
        <StDivider />
        <StCardContainer>
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
        </StCardContainer>
      </StPlantDiaryContainer>
    </StPlantListContainer>
  );
}

const StPlantListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  h1 {
    font-size: 40px;
  }
`;
const StPlantDiaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 26px;
    color: #767676;
  }
`;
const StPlantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const StDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #b4b4b4;
`;
const StAddButton = styled.button`
  background-color: lightgray;
  width: 213px;
  height: 64px;
  font-size: 24px;
  border: none;
  float: right;
`;
const StCardContainer = styled.div`
  display: grid;
  width: 1280px;
  padding-top: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;
