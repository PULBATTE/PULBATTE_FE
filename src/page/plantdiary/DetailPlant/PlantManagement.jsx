import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PlantEnv from '../../../components/plantdiary/PlantEnv';
import { palette } from '../../../styles/palette';
import repottingImg from '../../../assets/image/Repot_white.png';
import nutritionImg from '../../../assets/image/Nutrition_white.png';
import waterImg from '../../../assets/image/waterdrop_white.png';
import { doneDdayCheck } from '../../../apis/plantDiary';
import PlantInfoChart from '../../../components/plantdiary/PlantInfoChart';

export default function PlantManagement({
  plantDetailData,
  getPlantDetailApi,
}) {
  const { image, selectWater, selectSunshine, selectWind } = plantDetailData;

  const { plantJournalId } = useParams();

  const onCompeteHandler = async clicktag => {
    const data = await doneDdayCheck(plantJournalId, clicktag);
    // 데이터 형식을 변환
    const dataToJson = JSON.parse(data);
    // 데이터에서 statusCode에 따른 에러 핸들링
    if (dataToJson.data.statusCode >= 400) {
      alert(dataToJson.data.msg);
    }
    getPlantDetailApi();
  };

  return (
    <StTabSection>
      {/* section */}
      <StPlantInfoWrap>
        <StPlantInfoImg src={image} />
        <StPlantEnvWrapper>
          <h3>환경</h3>
          <StPlantEnv>
            <PlantEnv type="water" rating={selectWater} gap="8px" />
            <PlantEnv type="sunny" rating={selectSunshine} gap="8px" />
            <PlantEnv type="air" rating={selectWind} gap="8px" />
          </StPlantEnv>
        </StPlantEnvWrapper>
      </StPlantInfoWrap>
      <StPlantInfoWrap>
        <StPlantDdayCardWrapper>
          <StPlantDdayCard color={palette.card.blue}>
            <>
              <img alt="waterImg" src={waterImg} />
              <h3>물 주는 날</h3>
              {plantDetailData.waterDDay === 0 ? (
                <h3>D-day</h3>
              ) : (
                <h3>{`${plantDetailData.waterDDay}일 남음`}</h3>
              )}
            </>
            <StDdayConfirmButton
              type="button"
              onClick={() => onCompeteHandler('water')}
            >
              {plantDetailData.waterCheck ? '완료' : '완료하기'}
            </StDdayConfirmButton>
          </StPlantDdayCard>
          <StPlantDdayCard color={palette.card.green}>
            <>
              <img alt="repottingImg" src={repottingImg} />
              <h3>분갈이</h3>
              {plantDetailData.repottingDDay === 0 ? (
                <h3>D-day</h3>
              ) : (
                <h3>{`${plantDetailData.repottingDDay}일 남음`}</h3>
              )}
            </>
            <StDdayConfirmButton
              type="button"
              onClick={() => onCompeteHandler('repotting')}
            >
              {plantDetailData.repottingCheck ? '완료' : '완료하기'}
            </StDdayConfirmButton>
          </StPlantDdayCard>
          <StPlantDdayCard color={palette.card.brown}>
            <>
              <img alt="nutritionImg" src={nutritionImg} />
              <h3>영양제</h3>
              {plantDetailData.nutritionDDay === 0 ? (
                <h3>D-day</h3>
              ) : (
                <h3>{`${plantDetailData.nutritionDDay}일 남음`}</h3>
              )}
            </>
            <StDdayConfirmButton
              type="button"
              onClick={() => onCompeteHandler('nutrition')}
            >
              {plantDetailData.nutritionCheck ? '완료' : '완료하기'}
            </StDdayConfirmButton>
          </StPlantDdayCard>
        </StPlantDdayCardWrapper>
        <PlantInfoChart
          chartData={[
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
          ]}
        />
      </StPlantInfoWrap>
    </StTabSection>
  );
}

const StTabSection = styled.section`
  display: flex;
  gap: 0 5rem;
  margin: 40px 20px 20px 20px;
  max-width: 1120px;

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
  gap: 30px 0;
  @media (max-width: 1120px) {
    padding: 0px;
  }
`;
const StPlantInfoImg = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1.2/1;
  @media (max-width: 1120px) {
    width: 100%;
  }
`;
const StPlantEnvWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
const StPlantEnv = styled.div`
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
const StPlantDdayCardWrapper = styled.div`
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
const StPlantDdayCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background-color: ${props => props.color};
  gap: 5px 0;
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
    margin: 8px 0px;
  }
`;
const StDdayConfirmButton = styled.button`
  bottom: 0;
  background-color: ${palette.white};
  color: ${palette.text.green};
  border-color: transparent;
  width: 118px;
  height: 43px;
  font-size: 16px;
  border-radius: 12px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
