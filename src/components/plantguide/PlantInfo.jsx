import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PlantGraph from './PlantGraph';
import PlantEnviroment from './PlantEnviroment';
import { palette } from '../../styles/palette';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';
import { getPlantsInfo } from '../../apis/plantGuide';

export default function PlantInfo() {
  const { beginnerName } = useParams();
  const [plantInfo, setPlantInfo] = useState(null);

  useEffect(() => {
    getPlantsInfo(beginnerName)
      .then(res => setPlantInfo(res))
      .catch(error => console.log(error));
  }, []);

  return (
    <StContent>
      <div className="comment_message">
        식물을 직접 키우며 성장을 입력하고 성장그래프 가이드와 비교해보세요
      </div>
      <div>
        <StGrid>
          <div className="image_container">
            <img src={plantInfo && plantInfo.image} alt="식물이미지" />
            <span className="plant_name">
              {plantInfo && plantInfo.beginnerPlantName}
            </span>
          </div>
          <div className="graph_container">
            <PlantGraph />
          </div>

          {plantInfo && (
            <StGridInner>
              <PlantEnviroment
                title="빛"
                src={shineIcon}
                checkPoint={plantInfo.sunshine}
                name="sunny"
              />
              <PlantEnviroment
                title="물"
                src={waterIcon}
                checkPoint={plantInfo.water}
                name="water"
              />
              <PlantEnviroment
                title="통풍"
                src={airIcon}
                checkPoint={plantInfo.ventilation}
                name="air"
              />
            </StGridInner>
          )}

          <StTipContainer>
            <h4>TIP</h4>

            {plantInfo && (
              <ul>
                <li>
                  <span>∙</span> <span> {plantInfo.tipList[0]} </span>
                </li>
                <li>
                  <span>∙</span> <span> {plantInfo.tipList[1]}</span>
                </li>
                <li>
                  <span>∙</span> <span> {plantInfo.tipList[2]}</span>
                </li>
              </ul>
            )}
          </StTipContainer>
        </StGrid>
      </div>
    </StContent>
  );
}
const StContent = styled.div`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  gap: 40px 0;
  @media (max-width: 768px) {
    margin: 30px 0;
  }
  .comment_message {
    text-align: center;
    font-size: 1.1rem;
    color: ${palette.textColor1};
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const StGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1.5fr;
  gap: 15px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem 0;
  }
  .image_container {
    position: relative;
    width: fit-content;
    margin: 0 auto;
    @media (max-width: 768px) {
      order: 1;
    }
    img {
      width: 100%;
      border-radius: 20px;
      max-width: 300px;
      aspect-ratio: 1/1;
      @media (max-width: 768px) {
        max-width: 300px;
      }
    }
  }
  .plant_name {
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
  .graph_container {
    display: flex;
    align-items: center;
  }
`;
const StGridInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 24px;
  gap: 0 15px;
  @media (max-width: 768px) {
    padding: 40px 0px;
    order: 2;
  }
`;

const StTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  background: #ebf1ec;
  border-radius: 24px;
  gap: 5px 0;
  @media (max-width: 768px) {
    order: 4;
  }
  h4 {
    color: #0ba47f;
    font-size: 20px;
    margin: 7px 0;
  }
  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    @media (max-width: 768px) {
      gap: 15px 0;
    }
    li {
      display: flex;
    }
    span {
      font-weight: 500;
    }
  }
`;
