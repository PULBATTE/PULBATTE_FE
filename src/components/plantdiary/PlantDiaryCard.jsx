import { format } from 'date-fns';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import moreIcon from '../../assets/image/more_vert.png';

const MockData = [
  {
    plantJournalDiaryId: '0',
    content: 'string',
    createdAt: '2023-01-25T13:20:33.270Z',
    modifiedAt: '2023-01-25T13:20:33.270Z',
  },
];

export default function PlantDiaryCard({ plantDiaryList }) {
  console.log(plantDiaryList);
  const { content, createdAt } = plantDiaryList;
  console.log(format(new Date(createdAt), 'M/dd'));
  return (
    <StDiaryContainer>
      <StDiary>
        <StDateCircle>{format(new Date(createdAt), 'M/dd')}</StDateCircle>
        <StPlantDiaryCardContent>{content}</StPlantDiaryCardContent>
        <img src={moreIcon} alt="수정삭제 아이콘" />
      </StDiary>
    </StDiaryContainer>
  );
}

const StDiaryContainer = styled.div`
  width: 100%;
  /* height: 150px; */
`;
const StDiary = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${palette.Diary.green};
  border-radius: 14px;
  margin-bottom: 16px;
  padding: 12px 16px;
  box-sizing: border-box;
  img {
    position: absolute;
    right: 10px;
    width: 24px;
    height: 24px;
  }
`;
const StDateCircle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  span {
    font-size: 16px;
    font-weight: bold;
    color: ${palette.text.green};
  }
`;
const StPlantDiaryCardContent = styled.div`
  width: 100%;
`;
