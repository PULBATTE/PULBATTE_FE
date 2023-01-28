import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PlantDiaryCard from '../../../components/plantdiary/PlantDiaryCard';
import PlantDiaryCalendar from '../../../components/plantdiary/PlantDiaryCalendar';
import {
  getPlantDiaryListApi,
  postPlantDiaryApi,
} from '../../../apis/plantDiary';
import useModal from '../../../hooks/useModal';
import { palette } from '../../../styles/palette';
import CreateDiaryModal from '../../../components/plantdiary/CreateDiaryModal';

export default function PlantDiary() {
  const { plantJournalId } = useParams();
  const [plantDiaryList, setPlantDiaryList] = useState([]);
  const [modal, onChangeModalHandler] = useModal();

  const getPlantDiaryList = useCallback(async () => {
    const data = await getPlantDiaryListApi();
    console.log(data);
    setPlantDiaryList(data.data);
  }, []);

  useEffect(() => {
    getPlantDiaryList();
  }, [getPlantDiaryList]);

  const onSubmitDiaryHandler = async diaryContent => {
    await postPlantDiaryApi(plantJournalId, diaryContent);
    onChangeModalHandler();
  };
  const closeModal = () => {
    onChangeModalHandler();
  };

  return (
    <StTabSection>
      <StPlantInfoWrap>
        <PlantDiaryCalendar plantJournalId={plantJournalId} />
      </StPlantInfoWrap>
      <StPlantInfoWrap>
        <StPlantInfoHeader>
          <h3>작성한 일기</h3>
          <p>날짜를 누르면 일기를 작성할 수 있어요!</p>
          <StButton type="button" onClick={() => onChangeModalHandler()}>
            일기작성
          </StButton>
        </StPlantInfoHeader>
        {plantDiaryList.map(v => (
          <PlantDiaryCard
            key={v.id}
            plantDiary={v}
            onChangeModalHandler={onChangeModalHandler}
          />
        ))}
      </StPlantInfoWrap>
      {/* TODO: Redux */}
      <CreateDiaryModal
        modal={modal}
        onSubmitHandler={onSubmitDiaryHandler}
        closeModal={closeModal}
      />
    </StTabSection>
  );
}

const StTabSection = styled.section`
  display: flex;
  width: 100%;
  gap: 0 60px;
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
  margin-bottom: 26px;
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
