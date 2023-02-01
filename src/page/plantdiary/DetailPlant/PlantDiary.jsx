import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PlantDiaryCard from '../../../components/plantdiary/PlantDiaryCard';
import PlantDiaryCalendar from '../../../components/plantdiary/PlantDiaryCalendar';
import { getPlantDiaryListApi } from '../../../apis/plantDiary';

import { palette } from '../../../styles/palette';
import useContextModal from '../../../hooks/useContextModal';
import { modals } from '../../../context/plantDiary/Modals';

export default function PlantDiary() {
  const { plantJournalId } = useParams();
  const [plantDiaryList, setPlantDiaryList] = useState([]);
  const { openModal } = useContextModal();

  const getPlantDiaryList = useCallback(async () => {
    const data = await getPlantDiaryListApi(plantJournalId);

    setPlantDiaryList(data.data);
  }, [plantJournalId]);

  useEffect(() => {
    getPlantDiaryList();
  }, [getPlantDiaryList]);

  // 모달 Component와 모달에서 사용하는 props를 컨텍스트 훅에 값을 넣어준다.
  const onContextCreateModalHandler = () => {
    openModal(modals.CreateDiaryModal, {
      plantJournalId,
      getPlantDiaryList,
    });
  };

  return (
    <StTabSection>
      <StPlantInfoWrap>
        <PlantDiaryCalendar plantJournalId={plantJournalId} />
      </StPlantInfoWrap>
      <StPlantInfoWrap>
        <StPlantInfoHeader>
          <h3>작성한 일기</h3>
          <StButton type="button" onClick={onContextCreateModalHandler}>
            일기작성
          </StButton>
        </StPlantInfoHeader>
        <PlantDiaryCardContainer>
          {plantDiaryList.map((v, index) => (
            <PlantDiaryCard
              // eslint-disable-next-line react/no-array-index-key
              key={`${v.id}_${index}`}
              plantJournalId={plantJournalId}
              plantDiary={v}
              getPlantDiaryList={getPlantDiaryList}
            />
          ))}
        </PlantDiaryCardContainer>
      </StPlantInfoWrap>
    </StTabSection>
  );
}

const StTabSection = styled.section`
  display: flex;
  width: 100%;
  gap: 0 60px;
  margin: 40px 20px 80px 20px;
  max-width: 1120px;
  padding: 5vw 6vw;
  box-sizing: border-box;
  border-radius: 24px;
  box-shadow: 0px 10px 60px rgb(0 0 0 / 10%);
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
  /* gap: 30px 0; */
  @media (max-width: 1120px) {
    padding: 0px;
  }
`;
const StPlantInfoHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  p {
    margin: 0;
  }
  h3 {
    margin: 0;
  }
`;

const StButton = styled.button`
  padding: 9px 15px;
  font-size: 1rem;
  width: 100px;
  border: none;
  border-radius: 18px;
  background: ${palette.mainColor};
  color: #fff;
  font-weight: 600;

  cursor: pointer;
  &:active {
    background: #337461;
  }
`;

const PlantDiaryCardContainer = styled.div`
  width: 100%;
  height: 410px;
  overflow-y: scroll;
  padding: 5px 8px;
  box-sizing: border-box;
  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    background: #e1e1e1;
    /*  border: 1px solid #e6e3e3; */
    border-radius: 30px;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
`;
