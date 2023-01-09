// import { green } from '@mui/material/colors';
import { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft } from '../../assets/svgs';
import PlantInfoChart from '../../components/plantdiary/PlantInfoChart';
import PlantCalendar from '../../components/plantdiary/PlantCalendar';
import PlantInfoEnv from '../../components/plantdiary/PlantInfoEnv';

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
              <StDdayCard>
                <StDdayCardHeader>
                  <h3>물주는날</h3>
                  <p>Dday</p>
                </StDdayCardHeader>
                <StDdayChecked />
              </StDdayCard>
              <StDdayCard>
                <StDdayCardHeader>
                  <h3>분갈이</h3>
                  <p>Dday</p>
                </StDdayCardHeader>
                <StDdayChecked />
              </StDdayCard>
              <StDdayCard>
                <StDdayCardHeader>
                  <h3>영양제</h3>
                  <p>Dday</p>
                </StDdayCardHeader>
                <StDdayChecked />
              </StDdayCard>
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

// const StPlantInfoEnvWrapper = styled.div`
//   flex-direction: column;
// `;

// const StPlantInfoEnv = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: lightgray;
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
// `;

const StPlantInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

const StDdayCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgray;
  height: 200px;
  border-radius: 16px;
`;

const StDdayChecked = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: gray;
`;

const StDdayCardHeader = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;
