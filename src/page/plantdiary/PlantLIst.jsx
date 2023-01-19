import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import { getPlantList } from '../../apis/plantDiary';
import PlantListCard from '../../components/plantdiary/PlantListCard';

export default function PlantList() {
  const [plantList, setPlantList] = useState([]);
  const getPlantListApi = useCallback(async () => {
    const data = await getPlantList();
    console.log(data.data);
    setPlantList(data.data);
  }, []);

  useEffect(() => {
    getPlantListApi();
  }, [getPlantListApi]);

  const navigate = useNavigate();
  const onBackHandler = () => {
    navigate('/');
  };
  const onAddPlantHandler = () => {
    navigate('/addplant');
  };
  return (
    <StPlantListContainer>
      <StCreateHeader>
        <StBackButton onClick={onBackHandler}>
          <StArrowWrapper>
            <MdArrowBackIos />
          </StArrowWrapper>
        </StBackButton>
        <h3>식물일지</h3>
      </StCreateHeader>
      <StPlantDiaryContainer>
        <StPlantHeader>
          <h4>식물리스트</h4>
          <StAddButton onClick={onAddPlantHandler}>식물 추가하기</StAddButton>
        </StPlantHeader>
        <StDivider />
        <StCardContainer>
          {plantList.map(v => (
            <PlantListCard key={v.id} plantList={v} />
          ))}
          {/* <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          />
          <PlantListCard
            title="몬스테라"
            withday="D+25일"
            alarm="일정이 있어요!"
          /> */}
        </StCardContainer>
      </StPlantDiaryContainer>
    </StPlantListContainer>
  );
}

const StPlantListContainer = styled.div`
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  margin: 50px;
  max-width: 1372px;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  h1 {
    font-size: 40px;

  }
  h4 {
    font-size: 26px;
    color: #767676;
  }
`;
const StBackButton = styled.button`
  display: flex;
  border: none;
`;
const StArrowWrapper = styled.div`
  float: left;
`;
const StCreateHeader = styled.div`
  margin-top: 32px;
  text-align: center;
  width: 100%;
`;
const StPlantDiaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StPlantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const StDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #b4b4b4;
`;
const StAddButton = styled.button`
  background-color: ${palette.mainColor};
  color: ${palette.white};
  width: 181px;
  height: 56px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 32px;
  float: right;
`;
const StCardContainer = styled.div`
  display: grid;
  padding-top: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;
