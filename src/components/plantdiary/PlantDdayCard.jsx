/* eslint-disable react/prop-types */
import styled from 'styled-components';

export default function PlantDdayCard({ title, dday }) {
  return (
    <StDdayCard>
      <StDdayCardHeader>
        <h3>{title}</h3>
        <p>{dday}</p>
      </StDdayCardHeader>
      <StDdayChecked />
    </StDdayCard>
  );
}

const StDdayCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgray;
  height: 200px;
  border-radius: 16px;
`;

const StDdayCardHeader = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const StDdayChecked = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: gray;
`;
