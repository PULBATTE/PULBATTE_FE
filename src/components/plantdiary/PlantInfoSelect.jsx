/* eslint-disable react/prop-types */
import styled from 'styled-components';

const makeOptionArr = optionNum => {
  const Arr = [];
  for (let i = 1; i <= optionNum; i += 1) {
    Arr.push(i);
  }
  return Arr;
};

export default function PlantInfoSelect({ title, optionNum, optionString }) {
  const options = makeOptionArr(optionNum);
  return (
    <div>
      <p>{title}</p>
      <StSelectWrapper>
        <StSelect>
          {options.map(v => {
            return <option key={v}>{`${v}${optionString}`}</option>;
          })}
        </StSelect>
        <StTextWrapper>에 한 번</StTextWrapper>
      </StSelectWrapper>
    </div>
  );
}

const StSelectWrapper = styled.div`
  display: flex;
  height: 48px;
  gap: 24px;
`;
const StSelect = styled.select`
  width: 100%;
  border: none;
  border-bottom: 2px solid gray;
`;
const StTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
`;
