import styled from 'styled-components';

const MockData = [
  {
    id: '0',
    plantName: 'string',
    image: 'string',
    withPlantDay: '0',
  },
];

export default function PlantListCard({ plantList }) {
  const { image, plantName, withPlantDay } = plantList;
  console.log({ image, plantName, withPlantDay });
  return (
    <StCard>
      <StCardImgWrpper>
        <StPlantListImg alt="plantImg" src={image} />
      </StCardImgWrpper>
      <StCardFooter>
        <StPlantListInfo>
          <StInfoTitle>{plantName}</StInfoTitle>
          <StInfoDday>D+{withPlantDay}일</StInfoDday>
          {/* <StInfoAlarm>{alarm}</StInfoAlarm> */}
        </StPlantListInfo>
        <StIcon />
      </StCardFooter>
    </StCard>
  );
}

const StCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  border-radius: 16px;
  overflow: hidden;
`;
const StCardImgWrpper = styled.div`
  height: 250px;
  overflow: hidden;
`;

const StPlantListImg = styled.img`
  overflow-clip-margin: content-box;
  overflow: clip;
  width: 100%;
`;

const StCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: flex-end;
`;

const StPlantListInfo = styled.div`
  flex-direction: column;
`;
const StInfoTitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;
const StInfoDday = styled.p`
  margin: 0;
  font-size: 22px;
`;
// const StInfoAlarm = styled.p`
//   margin: 0;
//   font-size: 12px;
// `;
const StIcon = styled.div`
  background-color: gray;
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;
