import styled from 'styled-components';
import { CgTrash } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import { deletePlantApi } from '../../apis/plantDiary';
import { customNotify } from '../../util/toastMessage';

export default function PlantListCard({ plantInfo, getPlantList }) {
  const { image, plantName, withPlantDay, id } = plantInfo;
  console.log('plantInfo', plantInfo);
  const navigate = useNavigate();
  const onPlantHandler = () => {
    navigate(`/detailplant/${id}`);
  };

  const onDeletePlant = async e => {
    e.stopPropagation();
    try {
      const data = await deletePlantApi(id);
      console.log(data);
      // getPlantList();
      window.location.reload();
      console.log('getPlantList', getPlantList);
    } catch (error) {
      console.log(error);
      customNotify.error();
    }
  };

  return (
    <StCard onClick={onPlantHandler}>
      <StCardImgWrpper>
        <StPlantListImg alt="plantImg" src={image} />
      </StCardImgWrpper>
      <StPlantListInfo>
        <StInfoTitle>{plantName}</StInfoTitle>
        <StInfoDday>D+{withPlantDay}일</StInfoDday>
      </StPlantListInfo>
      <StDeleteBtn type="button" onClick={onDeletePlant}>
        <CgTrash size="20px" color={palette.white} />
      </StDeleteBtn>
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

const StDeleteBtn = styled.button`
  border: none;
  position: absolute;
  right: 15px;
  bottom: 16px;
  cursor: pointer;
  z-index: 3;
  @media (max-width: 500px) {
    right: 10px;
    bottom: 10px;
  }
`;

const StInfoTitle = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;
const StInfoDday = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  @media (max-width: 500px) {
    font-size: 10px;
  }
`;
