import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import { getPlantListApi } from '../../apis/plantDiary';
import PlantListCard from '../../components/plantdiary/PlantListCard';
import useRequireAuth from '../../hooks/useRedirect';

export default function PlantList() {
  const [plantList, setPlantList] = useState([]);

  const getPlantList = useCallback(async () => {
    const data = await getPlantListApi();
    console.log('data', data);
    setPlantList(data.data);
  }, [getPlantListApi]);

  useEffect(() => {
    getPlantList();
  }, []);

  console.log(plantList);
  const navigate = useNavigate();
  const onAddPlantHandler = () => {
    navigate('/addplant');
  };

  useRequireAuth('/api/user/signin');

  return (
    <StPlantListContainer>
      <StHeader>
        <h3>식물 일지</h3>
      </StHeader>
      <StPlantDiaryContainer>
        <StPlantHeader>
          <h4>식물리스트</h4>
          <StAddButton onClick={onAddPlantHandler}>식물 추가하기</StAddButton>
        </StPlantHeader>
        <StDivider />
        <StCardContainer>
          {plantList.map(v => (
            <PlantListCard key={v.id} plantInfo={v} />
          ))}
        </StCardContainer>
      </StPlantDiaryContainer>
    </StPlantListContainer>
  );
}

const StPlantListContainer = styled.div`
  flex-direction: column;
  align-items: center;

  max-width: 1372px;
  width: 100%;
  padding: 4rem 0 2rem;
  margin: 0 auto;
  box-sizing: border-box;
  min-height: 100vh;
  @media (max-width: 1440px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
  }

  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin: 5rem 0 4rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin: 2rem 0;
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
  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
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
  width: 100%;
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
