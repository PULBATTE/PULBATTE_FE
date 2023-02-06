import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';

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
    </StCard>
  );
}

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
