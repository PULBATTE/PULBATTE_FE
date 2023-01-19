/* eslint-disable react/prop-types */
import styled from 'styled-components';

const makeOptionArr = optionNum => {
  const Arr = [];
  for (let i = 1; i <= optionNum; i += 1) {
    Arr.push(i);
  }
  return Arr;
};

export default function PlantInfoSelect({
  title,
  icon,
  optionNum,
  optionString,
  onChange,
}) {
  const options = makeOptionArr(optionNum);
  return (
    <div>
      <StHeaderWrapper>
        <img src={icon} alt="식물환경 아이콘" />
        <p>{title}</p>
      </StHeaderWrapper>
      <StSelectWrapper>
        <StSelect onChange={onChange}>
          {options.map(v => {
            return <option key={v} value={v}>{`${v}${optionString}`}</option>;
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
const StHeaderWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
