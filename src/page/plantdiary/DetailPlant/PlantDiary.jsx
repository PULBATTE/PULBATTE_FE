import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PlantDiaryCard from '../../../components/plantdiary/PlantDiaryCard';
import PlantDiaryCalendar from '../../../components/plantdiary/PlantDiaryCalendar';
import { getPlantDiaryListApi } from '../../../apis/plantDiary';
import info from '../../../assets/image/info/info.png';
import { palette } from '../../../styles/palette';
import useContextModal from '../../../hooks/useContextModal';
import { modals } from '../../../context/plantDiary/Modals';
import infoImg from '../../../assets/image/info/detailPlantInfo2.png';

export default function PlantDiary() {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
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
  const onContextCreateModalHandler = date => {
    openModal(modals.CreateDiaryModal, {
      plantJournalId,
      getPlantDiaryList,
      selectedDate: date,
    });
  };

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
        <StPlantInfoHeader>
          <p>
            <h3>캘린더</h3>
            <span>날짜를 선택해서 일기를 작성해 보세요 :)</span>
          </p>
        </StPlantInfoHeader>
        <PlantDiaryCalendar
          plantJournalId={plantJournalId}
          modalHandler={onContextCreateModalHandler}
        />
      </StPlantInfoWrap>
      <StPlantInfoWrap>
        <StPlantInfoHeader>
          <h3>작성한 일기</h3>
          {/* <StButton type="button" onClick={onContextCreateModalHandler}>
            일기작성
          </StButton> */}
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

const StTabSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  gap: 0 60px;
  margin: 40px 20px 80px 20px;
  max-width: 1120px;
  padding: 5vw 6vw;
  box-sizing: border-box;
  border-radius: 24px;
  box-shadow: 0px 10px 60px rgb(0 0 0 / 10%);
  overflow: hidden;
  @media (max-width: 1120px) {
    flex-direction: column;
    width: 100%;
    min-width: 350px;
    box-sizing: border-box;
    gap: 4rem 0;
  }
  @media (max-width: 500px) {
    gap: 25px 0;
  }
`;
const StInfoButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  margin: 20px;
  border: none;
  cursor: pointer;
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
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  p {
    display: flex;
    gap: 8px;
    align-items: baseline;
  }
  h3 {
    margin: 0;
  }
  span {
    font-size: 12px;
    font-weight: 600;
    color: ${palette.text.gray_90};
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
    position: absolute;
    right: 0;
    margin-right: 30px;
    border: none;
    background-color: transparent;
    font-weight: 700;
    color: ${palette.white};
    cursor: pointer;
  }
  img {
    width: 80%;
    margin: auto;
    display: block;
  }
`;
