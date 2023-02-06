import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function DdayCheckerCard(props) {
  const { color, title, img, Dday, onCompeteHandler, checkState } = props;
  return (
    <StPlantDdayCard color={color}>
      <img alt="waterImg" src={img} />
      <h3>{title}</h3>
      {Dday === 0 ? (
        <>
          <h3>D-day</h3>
          <StDdayConfirmButton type="button" onClick={() => onCompeteHandler()}>
            {checkState ? '완료' : '완료하기'}
          </StDdayConfirmButton>
        </>
      ) : (
        <h3>{`${Dday}일 남음`}</h3>
      )}
    </StPlantDdayCard>
  );
}

const StPlantDdayCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 116px;
  padding: 15px;
  background-color: ${props => props.color};
  gap: 10px 0;
  align-items: center;
  border-radius: 16px;
  color: ${palette.white};
  @media (max-width: 1120px) {
    width: 116px;
    height: 152px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    height: 152px;
  }
  h3 {
    font-size: 1.1rem;
    margin: 0px;
  }
`;
const StDdayConfirmButton = styled.button`
  margin-top: 10px;
  background-color: ${palette.white};
  color: ${palette.text.green};
  border-color: transparent;
  width: 118px;
  height: 43px;
  font-size: 16px;
  border-radius: 12px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
