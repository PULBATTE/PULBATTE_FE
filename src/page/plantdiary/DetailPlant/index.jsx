import { useState, useCallback, useEffect } from 'react';

import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import { getPlantDetailApi } from '../../../apis/plantDiary';

import { palette } from '../../../styles/palette';

import PlantManagement from './PlantManagement';
import PlantDiary from './PlantDiary';
import { ModalProvider } from '../../../context/plantDiary/ModalsProvider';

export default function DetailPlant() {
  const [currentTab, setCurrentTab] = useState(1);
  const [plantDetailData, setPlantDetailData] = useState();
  const { plantJournalId } = useParams();
  const getPlantDetail = useCallback(async () => {
    const data = await getPlantDetailApi(plantJournalId);
    setPlantDetailData(data.data);
  }, [plantJournalId]);

  useEffect(() => {
    getPlantDetail();
  }, [getPlantDetail]);

  const onNavHandler = v => {
    setCurrentTab(v);
  };

  if (!plantDetailData) {
    return <>loading</>;
  }

  return (
    <ModalProvider>
      <StDetailPlantContainer>
        <StHeader>
          <h3>식물일지</h3>
        </StHeader>
        <StDetailPlantNav>
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
        </StDetailPlantNav>
        {currentTab === 1 ? (
          <PlantManagement
            plantDetailData={plantDetailData}
            getPlantDetail={getPlantDetail}
          />
        ) : (
          <PlantDiary />
        )}
      </StDetailPlantContainer>
    </ModalProvider>
  );
}

const StDetailPlantContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px 0;
  width: 80%;
  margin: 0 auto;
  padding: 4rem 0 2rem;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const StHeader = styled.div`
  text-align: center;
  width: 100%;
  font-size: 34px;
  h3 {
    font-size: 2.5rem;
    margin-top: 5rem;
    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin: 2rem 0;
    }
  }
`;

const StDetailPlantNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  > div {
    display: flex;
    gap: 0 20px;
  }
`;

const StNavTab = styled.button`
  background-color: transparent;
  font-size: 22px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ currentTab }) =>
    currentTab ? palette.text.green : palette.text.gray_A3};
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
