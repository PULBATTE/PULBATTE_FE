import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSun } from 'react-icons/bs';
import { GiWateringCan } from 'react-icons/gi';
import { CiTempHigh } from 'react-icons/ci';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import PlantContent from '../../components/search/PlantContent';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import { plantsSearchDetail } from '../../apis/plantsFilter';

export default function PlantDetail() {
  const { plantId } = useParams();
  const [plantInfo, setPlantInfo] = useState(null);
  console.log(plantInfo);
  useEffect(() => {
    plantsSearchDetail(plantId).then(res => setPlantInfo(res.data));
  }, []);
  return (
    <StWrapper>
      <div className="container_inner">
        <h3>식물 찾아보기</h3>
        <StContent>
          <div className="image_container">
            <img src={plantInfo?.image} alt="" />
          </div>
          <PlantContent plantInfo={plantInfo} />
        </StContent>
      </div>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  .container_inner {
    display: flex;
    flex-direction: column;
    max-width: 1150px;
    margin: 0 auto;
    gap: 40px 0;
    > button {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      line-height: 1;
      color: ${palette.textColor1};
    }
    h3 {
      text-align: center;
      font-size: 2.1rem;
      margin-top: 65px;
      @media (max-width: 1000px) {
        display: none;
        font-size: 1.7rem;
      }
    }
    img {
      width: 100%;
      aspect-ratio: 1/1;
    }
  }
`;

const StContent = styled.div`
  width: 80%;
  margin: 0 auto 40px;
  display: flex;
  gap: 0 60px;

  .image_container {
    max-width: 400px;
    width: 45%;
    @media (max-width: 1000px) {
      max-width: 500px;
      width: 100%;
    }
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    box-sizing: border-box;
    gap: 20px 0;
  }
  @media (max-width: 768px) {
    margin-top: 0;
    width: 100%;
  }
`;
