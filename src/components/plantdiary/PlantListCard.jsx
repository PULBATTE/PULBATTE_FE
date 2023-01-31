import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import ImgLoading from '../common/ImgLoading';
import alarmBtn from '../../assets/image/watch_later.png';

export default function PlantListCard({ plantList }) {
  const { image, plantName, withPlantDay, id } = plantList;
  const [isLoadingImg, setIsLoadingImg] = useState(true);

  const navigate = useNavigate();
  const onPlantHandler = () => {
    navigate(`/detailplant/${id}`);
  };

  return (
    <StCard onClick={onPlantHandler}>
      <StCardImgWrpper>
        <StPlantListImg
          alt="plantImg"
          src={image}
          onLoad={() => {
            setIsLoadingImg(false);
          }}
        />
      </StCardImgWrpper>
      <StPlantListInfo>
        <StInfoTitle>{plantName}</StInfoTitle>
        <StInfoDday>D+{withPlantDay}일</StInfoDday>
      </StPlantListInfo>
      {/* TODO: Lazy Loading */}
      {/* {isLoadingImg && (
        <StAbsolutePositionBox>
          <ImgLoading />
        </StAbsolutePositionBox>
      )} */}
      <StDdayAlarm>
        <img src={alarmBtn} alt="alarm" />
        <p>할일</p>
      </StDdayAlarm>
    </StCard>
  );
}
const StDdayAlarm = styled.div`
  position: absolute;
  background-color: ${palette.white};
  padding: 8px 15px;
  font-size: 0px;
  z-index: 10;
  top: 0px;
  right: 0px;
  margin: 20px;
  border-radius: 24px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 4px;
  p {
    margin: 0;
    color: ${palette.mainColor};
    font-size: 18px;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
  }
`;
const StAbsolutePositionBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
`;

const StCard = styled.div`
  position: relative;
  background-color: #f7f7f7;
  border-radius: 16px;
  cursor: pointer;
`;
const StCardImgWrpper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.07);
  position: relative;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent 60%, #3333338f 100%);
  }
`;

const StPlantListImg = styled.img`
  width: 100%;
  display: block;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const StPlantListInfo = styled.div`
  flex-direction: column;
  position: absolute;
  bottom: 15px;
  left: 15px;
  @media (max-width: 500px) {
    bottom: 10px;
    left: 10px;
  }
  p {
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);

    color: ${palette.white};
  }
`;
const StInfoTitle = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
const StInfoDday = styled.p`
  margin: 0;
  font-size: 1.7rem;
  font-weight: 800;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;
