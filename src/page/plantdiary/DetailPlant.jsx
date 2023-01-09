import { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft } from '../../assets/svgs';
import PlantInfoChart from '../../components/plantdiary/PlantInfoChart';
import PlantCalendar from '../../components/plantdiary/PlantCalendar';
import PlantInfoEnv from '../../components/plantdiary/PlantInfoEnv';
import PlantDdayCard from '../../components/plantdiary/PlantDdayCard';

export default function DetailPlant() {
  const [currentTab, setCurrentTab] = useState(1);
  const onNavHandler = v => {
    setCurrentTab(v);
  };
  return (
    <StDetailPlantContainer>
      <h1>식물일지</h1>
      <StDetailPlantNav>
        <StBackNavButton type="button">
          <ChevronLeft />
          <StSpan>식물 리스트</StSpan>
        </StBackNavButton>
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
            식물 일기
          </StNavTab>
        </div>
        <div style={{ width: '124px' }} />
      </StDetailPlantNav>
      {currentTab === 1 ? (
        <StTabSection>
          <StPlantInfoWrap>
            <StPlantInfoImg>Plant Img</StPlantInfoImg>
            <StPlantInfo>
              <PlantInfoEnv title="물 주기" />
              <PlantInfoEnv title="통풍" />
              <PlantInfoEnv title="햇빛" />
            </StPlantInfo>
          </StPlantInfoWrap>
          <StPlantInfoWrap>
            <StPlantInfoWrapper>
              <PlantDdayCard title="물 주기" dday="3일 전" />
              <PlantDdayCard title="분갈이" dday="D-day" />
              <PlantDdayCard title="영양제" dday="20일 전" />
            </StPlantInfoWrapper>
            <PlantInfoChart />
          </StPlantInfoWrap>
        </StTabSection>
      ) : (
        <StTabSection>
          <StPlantInfoWrap>
            <PlantCalendar />
          </StPlantInfoWrap>
          <StPlantInfoWrap>
            <StPlantInfoImg>Plant Img</StPlantInfoImg>
          </StPlantInfoWrap>
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
`;

const StDetailPlantNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  width: 100%;
`;

const StBackNavButton = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  border: none;
`;
const StSpan = styled.span`
  font-size: 1.2rem;
`;
const StNavTab = styled.button`
  background-color: transparent;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ currentTab }) => (currentTab ? '#000' : '#A3A3A3')};
`;

const StTabSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  background-color: beige;
  margin: 20px;
  width: 1120px;
  @media (max-width: 1120px) {
    flex-direction: column;
    width: 100%;
    min-width: 350px;
  }
`;

const StPlantInfoWrap = styled.article`
  background-color: aliceblue;
  flex: 1;
  padding: 16px;
`;

const StPlantInfoImg = styled.div`
  background-color: lightgray;
  width: 100%;
  height: 480px;
`;

const StPlantInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px;
`;

const StPlantInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;
