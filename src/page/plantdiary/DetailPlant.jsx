import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PlantInfoChart from '../../components/plantdiary/PlantInfoChart';
import PlantCalendar from '../../components/plantdiary/PlantCalendar';
import PlantEnv from '../../components/plantdiary/PlantEnv';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';
import repottingImg from '../../assets/image/Repot_white.png';
import nutritionImg from '../../assets/image/Nutrition_white.png';
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
                  checkPoint={plantDetailData.selectSunshine}
                  gap="8px"
                />
                <PlantEnv
                  title="통풍"
                  name="air"
                  isDisabled={false}
                  src={airIcon}
                  checkPoint={plantDetailData.selectWind}
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
  gap: 40px 0;
  width: 80%;
  margin: 0 auto;
`;
const StHeader = styled.div`
  text-align: center;
  width: 100%;
  font-size: 34px;
  h3 {
    font-size: 2.1rem;
    margin-top: 65px;
    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin-top: 45px;
    }
  }
`;

const StDetailPlantNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StNavTab = styled.button`
  background-color: transparent;
  font-size: 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ currentTab }) =>
    currentTab ? palette.text.green : palette.text.gray_A3};
`;

const StTabSection = styled.section`
  display: flex;
  gap: 0 5rem;
  margin: 40px 20px 20px 20px;
  max-width: 1120px;

  @media (max-width: 1120px) {
    flex-direction: column;
    width: 100%;
    min-width: 350px;
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
  gap: 20px 0;
  @media (max-width: 1120px) {
    padding: 0px;
  }
`;

const StPlantInfoImg = styled.img`
  width: 100%;
  object-fit: cover;
  /*  max-height: 330px; */
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

  margin: 24px 0px;
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
  @media (max-width: 500px) {
    width: 100%;
  }
`;
