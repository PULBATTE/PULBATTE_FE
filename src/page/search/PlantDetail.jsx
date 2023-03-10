import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSun } from 'react-icons/bs';
import { GiWateringCan } from 'react-icons/gi';
import { CiTempHigh } from 'react-icons/ci';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PlantContent from '../../components/search/PlantContent';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import { plantsSearchDetailApi } from '../../apis/plantsFilter';
import Sunny from '../../assets/image/wb_sunny.png';
import waterDrop from '../../assets/image/water_drop.png';
import thermostat from '../../assets/image/thermostat_auto.png';
import grain from '../../assets/image/grain.png';

export default function PlantDetail() {
  const { plantId } = useParams();
  const [plantInfo, setPlantInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    plantsSearchDetailApi(plantId).then(res => setPlantInfo(res.data));
  }, []);
  return (
    <StWrapper>
      <div className="container_inner">
        <StContent>
          <div className="image_container">
            <img src={plantInfo?.image} alt="" />
            <StLinkBtn
              type="button"
              onClick={() =>
                window.open(`https://www.instagram.com/${plantInfo?.holder}`)
              }
            >
              {plantInfo?.holder}
            </StLinkBtn>
          </div>
          <PlantContent plantInfo={plantInfo} />
        </StContent>
        <StTipContainer>
          <span className="section_title">✔️ 이렇게 키우면 좋아요</span>
          <StTipGrid>
            <div>
              <StImg src={thermostat} />
              <span className="category_type">{plantInfo?.tempType}</span>
              <span className="category_text">{plantInfo?.temp}</span>
            </div>
            <div>
              <StImg src={grain} />
              <span className="category_type">{plantInfo?.humidityType}</span>
              <span className="category_text">{plantInfo?.humidity}</span>
            </div>
            <div>
              <StImg src={Sunny} />
              <span className="category_type">{plantInfo?.sunshineType}</span>
              <span className="category_text">{plantInfo?.sunshine}</span>
            </div>
            <div>
              <StImg src={waterDrop} />
              <span className="category_type">{plantInfo?.waterType}</span>
              <span className="category_text">{plantInfo?.water}</span>
            </div>
          </StTipGrid>
        </StTipContainer>
      </div>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  padding: 4rem 0 2rem;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  position: relative;

  @media (max-width: 1280px) {
    height: 100%;
  }
  @media (max-width: 768px) {
    margin-top: 0;
  }
  .container_inner {
    display: flex;
    flex-direction: column;
    max-width: 1370px;
    margin: 0 auto;
    gap: 40px 0;
    padding-top: 7rem;
    @media (max-width: 768px) {
      gap: 20px 0;
      padding-top: 0rem;
    }
    > button {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      line-height: 1;
      color: ${palette.textColor1};
    }
    h3 {
      text-align: center;
      font-size: 2.5rem;
      margin: 5rem 0 2rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
      @media (max-width: 500px) {
        font-size: 1.5rem;
        margin: 2rem 0;
      }
    }
    .image_container {
      position: relative;
      img {
        width: 100%;
        aspect-ratio: 1/1;
      }
    }
  }
`;

const StContent = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 0 5rem;

  .image_container {
    max-width: 500px;
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
const StTipContainer = styled.div`
  background: #f5f8f6;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 16px;
  > span {
    display: block;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 700;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;
const StTipGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /*   border-top: 1px solid ${palette.borderColor1};
  border-bottom: 1px solid ${palette.borderColor1}; */
  padding-top: 24px;
  gap: 0 16px;
  box-sizing: border-box;
  border-radius: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  svg {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  .category_type {
    font-size: 1.1rem;
    font-weight: 700;
    margin-top: 10px;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  .category_text {
    font-size: 1rem;
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
  > div {
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    gap: 8px 0;
    background: ${palette.white};

    &:first-child {
      border-bottom: 1px solid ${palette.borderColor1};
    }
    &:nth-child(2) {
      border-bottom: 1px solid ${palette.borderColor1};
    }
    &:nth-child(2n-1) {
      border-right: 1px solid ${palette.borderColor1};
    }
  }
`;
const StImg = styled.img`
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const StLinkBtn = styled.div`
  padding: 8px 10px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  color: #797979;
  position: absolute;
  min-width: 100px;
  text-align: center;
  left: 2rem;
  bottom: 2rem;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  box-shadow: 0 0px 20px rgb(0 0 0 / 10%);
  cursor: pointer;
`;
