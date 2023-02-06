import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import VerticalTitlePlantEnv from '../../../components/plantdiary/VerticalTitlePlantEnv';
import { palette } from '../../../styles/palette';
import repottingImg from '../../../assets/image/Repot_white.png';
import nutritionImg from '../../../assets/image/Nutrition_white.png';
import waterImg from '../../../assets/image/waterdrop_white.png';
import infoImg from '../../../assets/image/info/detailPlantInfo1.png';
import info from '../../../assets/image/info/info.png';
import { doneDdayCheckApi } from '../../../apis/plantDiary';
import PlantInfoChart from '../../../components/plantdiary/PlantInfoChart';
import DdayCheckerCard from '../../../components/plantdiary/DdayCheckerCard';
import useRequireAuth from '../../../hooks/useRedirect';

export default function PlantManagement({ plantDetailData, getPlantDetail }) {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const {
    image,
    plantName,
    withPlantDay,
    selectWater,
    selectSunshine,
    selectWind,
  } = plantDetailData;

  useRequireAuth('/api/user/signin');
  const { plantJournalId } = useParams();
  const onCompeteHandler = async clicktag => {
    const data = await doneDdayCheckApi(plantJournalId, clicktag);
    // 데이터 형식을 변환
    const dataToJson = JSON.parse(data);
    // 데이터에서 statusCode에 따른 에러 핸들링
    if (dataToJson.data.statusCode >= 400) {
      alert(dataToJson.data.msg);
    }
    getPlantDetail();
  };

  const ChartData = [
    {
      type: 'water',
      totalDday: plantDetailData.totalWaterDDayClick,
      currentDday: plantDetailData.currentWaterDdayClick,
    },
    {
      type: 'repotting',
      totalDday: plantDetailData.totalRepottingDDayClick,
      currentDday: plantDetailData.currentRepottingDDayClick,
    },
    {
      type: 'Nutrition',
      totalDday: plantDetailData.totalNutritionDDayClick,
      currentDday: plantDetailData.currentNutritionDDayClick,
    },
  ];

  return (
    <StTabSection>
      <StInfoButton
        onClick={() => {
          setIsOpenInfo(true);
        }}
      >
        <img src={info} alt="" />
      </StInfoButton>
      <StPlantInfoWrap>
        <StCard>
          <StPlantInfoImg src={image} />
          <StPlantListInfo>
            <StInfoName>{plantName}</StInfoName>
            <StInfoWithPlantDay>함께한지+{withPlantDay}일</StInfoWithPlantDay>
          </StPlantListInfo>
        </StCard>
        <StVerticalTitlePlantEnvWrapper>
          <h3>환경</h3>
          <StVerticalTitlePlantEnv>
            <VerticalTitlePlantEnv
              type="water"
              rating={selectWater}
              gap="8px"
            />
            <VerticalTitlePlantEnv
              type="sunny"
              rating={selectSunshine}
              gap="8px"
            />
            <VerticalTitlePlantEnv type="air" rating={selectWind} gap="8px" />
          </StVerticalTitlePlantEnv>
        </StVerticalTitlePlantEnvWrapper>
      </StPlantInfoWrap>
      <StPlantInfoWrap>
        <StPlantDdayCheckerCardWrapper>
          <DdayCheckerCard
            color={palette.card.blue}
            title="물 주는 날"
            img={waterImg}
            Dday={plantDetailData.waterDDay}
            onCompeteHandler={() => onCompeteHandler('water')}
            checkState={plantDetailData.waterCheck}
          />
          <DdayCheckerCard
            color={palette.card.green}
            title="분갈이"
            img={repottingImg}
            Dday={plantDetailData.repottingDDay}
            onCompeteHandler={() => onCompeteHandler('repotting')}
            checkState={plantDetailData.repottingCheck}
          />
          <DdayCheckerCard
            color={palette.card.brown}
            title="영양제"
            img={nutritionImg}
            Dday={plantDetailData.nutritionDDay}
            onCompeteHandler={() => onCompeteHandler('nutrition')}
            checkState={plantDetailData.nutritionCheck}
          />
        </StPlantDdayCheckerCardWrapper>
        <PlantInfoChart chartData={ChartData} />
      </StPlantInfoWrap>
      {isOpenInfo && (
        <StInfo>
          <StImageContainer>
            <button
              type="button"
              onClick={() => {
                setIsOpenInfo(false);
              }}
            >
              x
            </button>
            <img alt="infoModal" src={infoImg} />
          </StImageContainer>
        </StInfo>
      )}
    </StTabSection>
  );
}
const StInfoButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  margin: 20px;
  border: none;
  cursor: pointer;
`;
const StInfo = styled.div`
  position: absolute;
  padding: 0px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333333cc;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StImageContainer = styled.div`
  position: relative;
  width: 100%;

  button {
    font-size: 32px;
    margin-right: 30px;
    position: absolute;
    right: 0;
    border: none;
    background-color: transparent;
    font-weight: 700;
    color: ${palette.white};
    cursor: pointer;
  }
  img {
    width: 90%;
    margin: auto;
    display: block;
  }
`;

const StTabSection = styled.section`
  position: relative;
  display: flex;
  gap: 0 5rem;
  margin: 40px 0px 20px 0px;
  max-width: 1120px;
  padding: 5vw 6vw;
  border-radius: 24px;
  box-shadow: 0px 10px 60px rgb(0 0 0 / 10%);
  overflow: hidden;
  @media (max-width: 1120px) {
    flex-direction: column;
    width: 100%;
    min-width: 350px;
    gap: 4rem 0;
  }
  @media (max-width: 500px) {
    gap: 25px 0;
  }
`;

const StPlantInfoWrap = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px 0;
  @media (max-width: 1120px) {
    padding: 0px;
  }
`;
const StCard = styled.div`
  position: relative;
  background-color: #f7f7f7;
  border-radius: 16px;
  cursor: pointer;
`;
const StPlantInfoImg = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1.2/1;
  max-width: 370px;
  max-height: 300px;
  @media (max-width: 1120px) {
    width: 100%;
  }
`;
const StPlantListInfo = styled.div`
  flex-direction: column;
  position: absolute;
  bottom: 15px;
  left: 15px;
  @media (max-width: 500px) {
    bottom: 10px;
    left: 10px;
  }
  p {
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);

    color: ${palette.white};
  }
`;
const StInfoName = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
const StInfoWithPlantDay = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const StVerticalTitlePlantEnvWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
const StVerticalTitlePlantEnv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  h3 {
    font-size: 18px;
    text-align: center;
  }
  @media (max-width: 1120px) {
    min-width: 350px;
  }
`;
const StPlantDdayCheckerCardWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0 10px;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;

  @media (min-width: 1120px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const StPlantDdayCheckerCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background-color: ${props => props.color};
  gap: 10px 0;
  align-items: center;
  border-radius: 16px;
  color: ${palette.white};
  @media (max-width: 1120px) {
    width: 116px;
    height: 152px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  h3 {
    font-size: 1.1rem;
    margin: 0px;
  }
`;
