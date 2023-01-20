import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PlantInfoChart from '../../components/plantdiary/PlantInfoChart';

import PlantCalendar from '../../components/plantdiary/PlantCalendar';
import PlantEnv from '../../components/plantdiary/PlantEnv';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';
import repottingIcon from '../../assets/image/spa.png';
import nutritionIcon from '../../assets/image/scatter_plot.png';

import { getPlantDetail, doneDdayCheck } from '../../apis/plantDiary';
import waterImg from '../../assets/image/waterdrop_white.png';
import { palette } from '../../styles/palette';

export default function DetailPlant() {
  const [currentTab, setCurrentTab] = useState(1);
  const [plantDetailData, setPlantDetailData] = useState();
  const { plantJournalId } = useParams();

  const getPlantDetailApi = useCallback(async () => {
    const data = await getPlantDetail(plantJournalId);
    setPlantDetailData(data.data);
  }, [plantJournalId]);

  useEffect(() => {
    getPlantDetailApi();
  }, [getPlantDetailApi]);

  const onNavHandler = v => {
    setCurrentTab(v);
  };
  const onCompeteHandler = async clicktag => {
    const data = await doneDdayCheck(plantJournalId, clicktag);
    console.log(data);
    if (data.data.statusCode >= 400) {
      alert(data.data.msg);
    }
    getPlantDetailApi();
  };

  if (!plantDetailData) {
    return <>loading</>;
  }

  console.log({ plantDetailData });
  return (
    <StDetailPlantContainer>
      <StHeader>
        <h3>식물일지</h3>
      </StHeader>
      <StDetailPlantNav>
        <div>
          <StNavTab
            index={1}
            currentTab={currentTab === 1}
            onClick={() => onNavHandler(1)}
          >
            내 식물 관리
          </StNavTab>
          <StNavTab
            index={2}
            currentTab={currentTab === 2}
            onClick={() => onNavHandler(2)}
          >
            식물 다이어리
          </StNavTab>
        </div>
      </StDetailPlantNav>
      {currentTab === 1 ? (
        <StTabSection>
          <StPlantInfoWrap>
            <StPlantInfoImg src={plantDetailData.image} />
            <StPlantEnvWrapper>
              <h3>환경</h3>
              <StPlantEnv>
                <PlantEnv
                  title="물 주는 양"
                  name="water"
                  isDisabled={false}
                  src={waterIcon}
                  checkPoint={plantDetailData.selectWater}
                  gap="8px"
                />
                <PlantEnv
                  title="일조량"
                  name="sunny"
                  isDisabled={false}
                  src={shineIcon}
                  checkPoint={plantDetailData.selcetSunshine}
                  gap="8px"
                />
                <PlantEnv
                  title="통풍"
                  name="air"
                  isDisabled={false}
                  src={airIcon}
                  checkPoint={plantDetailData.selcetWind}
                  gap="8px"
                />
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
                  {plantDetailData.waterCheak ? '완료' : '완료하기'}
                </StDdayConfirmButton>
              </StPlantDdayCard>
              <StPlantDdayCard color={palette.card.green}>
                <>
                  <img alt="repottingIcon" src={repottingIcon} />
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
                  {plantDetailData.repottingCheak ? '완료' : '완료하기'}
                </StDdayConfirmButton>
              </StPlantDdayCard>
              <StPlantDdayCard color={palette.card.brown}>
                <>
                  <img alt="nutritionIcon" src={nutritionIcon} />
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
                  {plantDetailData.nutrituinCheak ? '완료' : '완료하기'}
                </StDdayConfirmButton>
              </StPlantDdayCard>
            </StPlantDdayCardWrapper>
            <PlantInfoChart
              chartData={[
                {
                  type: 'Nutrition',
                  totalDday: plantDetailData.totalNutritionDDayClick,
                  currentDDay: plantDetailData.currentNutritionDDayClick,
                },
                {
                  type: 'water',
                  totalDday: plantDetailData.totalWaterDDayClick,
                  currentDDay: plantDetailData.currentNutritionDDayClick,
                },
                {
                  type: 'repotting',
                  totalDday: plantDetailData.totalRepottingDDayClick,
                  currentDDay: plantDetailData.currentRepottingDDayClick,
                },
              ]}
            />
          </StPlantInfoWrap>
        </StTabSection>
      ) : (
        <StTabSection>
          <StPlantInfoWrap>
            <PlantCalendar />
          </StPlantInfoWrap>
          <StPlantInfoWrap />
        </StTabSection>
      )}
    </StDetailPlantContainer>
  );
}

const StDetailPlantContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 50px;
  margin: 50px;
  @media (max-width: 1120px) {
    padding: 0;
    margin: 0;
  }
`;
const StHeader = styled.div`
  margin-top: 32px;
  text-align: center;
  width: 100%;
  font-size: 34px;
`;

const StDetailPlantNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
`;

const StNavTab = styled.button`
  background-color: transparent;
  font-size: 24px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ currentTab }) =>
    currentTab ? palette.text.green : palette.text.gray_A3};
`;

const StTabSection = styled.section`
  display: flex;
  justify-content: space-evenly;

  margin: 20px;
  width: 1120px;

  @media (max-width: 1120px) {
    flex-direction: column;
    width: 100%;
    min-width: 350px;
  }
`;

const StPlantInfoWrap = styled.article`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1120px) {
    padding: 0px;
  }
`;

const StPlantInfoImg = styled.img`
  width: 100%;
  height: 480px;
  @media (max-width: 1120px) {
    width: 100%;
  }
`;

const StPlantEnvWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 38px;
`;

const StPlantEnv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 62px;
  width: 100%;
  margin: 24px 0px;
  h3 {
    font-size: 18px;
    text-align: center;
  }
  @media (max-width: 1120px) {
    width: 100%;
    min-width: 350px;
  }
`;

const StPlantDdayCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 460px;
  padding: 8px;
  @media (min-width: 1120px) {
    width: 100%;
  }
`;
const StPlantDdayCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background-color: ${props => props.color};
  align-items: center;
  width: 148px;
  height: 188px;
  border-radius: 16px;
  color: ${palette.white};
  @media (max-width: 1120px) {
    width: 116px;
    height: 152px;
  }
  h3 {
    font-size: 16px;
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
`;
