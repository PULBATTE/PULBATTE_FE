import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import PlantCalendar from '../../../components/plantdiary/PlantCalendar';
import { getPlantDiaryList, postPlantDiary } from '../../../apis/plantDiary';
import useModal from '../../../hooks/useModal';
import ConfirmModal from '../../../components/plantguide/ConfirmModal';
import { palette } from '../../../styles/palette';
import CreateDiaryModal from '../../../components/plantdiary/CreateDiaryModal';

export default function PlantDiary() {
  const { plantJournalId } = useParams();
  const [diaryList, setDiaryList] = useState();
  const [modal, onChangeModalHandler] = useModal();
  console.log(plantJournalId);
  const getPlantDiaryListApi = useCallback(async () => {
    const data = await getPlantDiaryList();
    setDiaryList(data);
  }, []);

  useEffect(() => {
    getPlantDiaryListApi();
  }, [getPlantDiaryListApi]);

  // 함수를 정의할 때 사용하는 변수를 매개변수
  const onSubmitDiaryHandler = async diaryContent => {
    await postPlantDiary(plantJournalId, diaryContent);
  };
  const closeModal = () => {
    onChangeModalHandler();
  };

  // const temp = '2023-01-24T13:20:33.270Z';
  // console.log(format(new Date(temp), 'M/dd'));

  return (
    <StTabSection>
      <StPlantInfoWrap>
        <PlantCalendar />
      </StPlantInfoWrap>
      <StPlantInfoWrap>
        <StButton type="button" onClick={() => onChangeModalHandler()}>
          입력
        </StButton>
        <StDiaryContainer>
          <StDiary>
            <StDateCircle>
              <span>1/31</span>
            </StDateCircle>
            <span>내용</span>
          </StDiary>
          <StDiary>
            <StDateCircle>
              <span>1/31</span>
            </StDateCircle>
            <span>내용</span>
          </StDiary>
          <StDiary>
            <StDateCircle>
              <span>1/31</span>
            </StDateCircle>
            <span>내용</span>
          </StDiary>
          <StDiary>
            <StDateCircle>
              <span>1/31</span>
            </StDateCircle>
            <span>내용</span>
          </StDiary>
        </StDiaryContainer>
      </StPlantInfoWrap>
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

const StButton = styled.button`
  padding: 9px 15px;
  font-size: 1rem;
  width: 100px;
  border: none;
  border-radius: 18px;
  background: ${palette.mainColor};
  color: #fff;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;
  &:active {
    background: #337461;
  }
`;

const StDiaryContainer = styled.div`
  width: 100%;
  /* height: 150px; */
`;
const StDiary = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 76px;
  background-color: ${palette.Diary.green};
  border-radius: 14px;
`;

const StDateCircle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 16px;
    font-weight: bold;
    color: ${palette.text.green};
  }
`;
