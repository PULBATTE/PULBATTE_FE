import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import { getPlantListApi } from '../../apis/plantDiary';
import PlantListCard from '../../components/plantdiary/PlantListCard';

export default function PlantList() {
  const [plantList, setPlantList] = useState([]);
  const getPlantList = useCallback(async () => {
    const data = await getPlantListApi();
    console.log(data.data);
    setPlantList(data.data);
  }, []);

  useEffect(() => {
    getPlantList();
  }, [getPlantList]);

  const navigate = useNavigate();
  const onAddPlantHandler = () => {
    navigate('/addplant');
  };

  return (
    <StPlantListContainer>
      <StHeader>
        <h3>식물일지</h3>
      </StHeader>
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
  margin: 7rem auto 3rem;
  @media (max-width: 768px) {
    width: 100%;
    margin: 4rem auto 3rem;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.8rem;
      margin-top: 45px;
    }
  }
  h4 {
    font-size: 25px;
    color: #767676;
    @media (max-width: 768px) {
      font-size: 23px;
    }
    @media (max-width: 500px) {
      font-size: 18px;
    }
  }
`;
const StHeader = styled.div`
  margin-top: 32px;
  text-align: center;
  width: 100%;
  font-size: 34px;
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
  width: 135px;
  height: 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 32px;
  float: right;
  @media (max-width: 500px) {
    width: 95px;
    height: 30px;
    font-size: 12px;
  }
`;
const StCardContainer = styled.div`
  display: grid;
  padding: 20px 0;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr 1fr;
  }
`;
