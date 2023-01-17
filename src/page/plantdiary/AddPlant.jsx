import React from 'react';
import styled from 'styled-components';
import PlantInfoSelect from '../../components/plantdiary/PlantInfoSelect';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';
import PlantEnviroment from '../../components/plantguide/PlantEnviroment';

export default function AddPlant() {
  return (
    <StAddPlantContainer>
      <StPlantProfile>
        <h3>식물이름</h3>
        <StPlantName placeholder="식물 이름을 입력해 주세요" />
        <h3>식물 사진</h3>
        <StImageRactangle>등록할 식물 사진 추가하기</StImageRactangle>
      </StPlantProfile>
      <StPlantInfo>
        <h3>식물알림</h3>
        <PlantInfoSelect title="물 주기" optionNum={30} optionString="일" />
        <PlantInfoSelect title="분갈이" optionNum={12} optionString="개월" />
        <PlantInfoSelect title="영양제" optionNum={12} optionString="개월" />
        <PlantCalendarInput />
      </StPlantInfo>
      <h3>식물환경</h3>
      <StPlantEnv>
        <PlantEnviroment
          title="빛"
          isDisabled={false}
          src={shineIcon}
          checkPoint="4"
          name="sunny"
        />
        <PlantEnviroment
          title="물"
          isDisabled={false}
          src={waterIcon}
          checkPoint="2"
          name="water"
        />
        <PlantEnviroment
          title="통풍"
          isDisabled={false}
          src={airIcon}
          checkPoint="3"
          name="air"
        />
      </StPlantEnv>
    </StAddPlantContainer>
  );
}

const PlantCalendarInput = () => (
  <div>
    <p>마지막 물 준 날</p>
    <StCalendarInputWrapper>
      <StLastWater type="date" max="2050-12-31" min="2023-01-01" />
      <StTextWrapper>에 줬어요</StTextWrapper>
    </StCalendarInputWrapper>
  </div>
);

const StAddPlantContainer = styled.div`
  width: 650px;
  margin: 0 auto;
  padding: 32px;
`;
const StPlantProfile = styled.div`
  width: 100%;
  text-align: center;
`;

const StPlantName = styled.input`
  width: 100%;
  padding: 4px 8px;
  height: 32px;
  border: none;
  border-bottom: 1px solid black;
`;
const StImageRactangle = styled.div`
  width: 100%;
  height: 144px;
  border-radius: 8px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StPlantInfo = styled.div`
  width: 100%;
  h3 {
    font-size: 18px;
    text-align: center;
  }
`;

const StPlantEnv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  h3 {
    font-size: 18px;
    text-align: center;
  }
`;

const StLastWater = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid gray;
`;

const StCalendarInputWrapper = styled.div`
  display: flex;
  height: 48px;
  gap: 24px;
`;
const StTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
`;
