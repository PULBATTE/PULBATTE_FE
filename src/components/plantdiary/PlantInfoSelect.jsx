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
        <div className="select_container">
          <StSelect onChange={onChange}>
            <option hidden>선택하세요</option>
            {options.map(v => {
              return <option key={v} value={v}>{`${v}${optionString}`}</option>;
            })}
          </StSelect>
        </div>
        <StTextWrapper>에 한 번</StTextWrapper>
      </StSelectWrapper>
    </div>
  );
}

const StSelectWrapper = styled.div`
  display: flex;
  height: 40px;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 0;
    gap: 0 20px;
  }
  .select_container {
    width: 100%;
    max-width: 230px;
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 11%);
    border-radius: 16px;
    text-align: center;
    font-size: 1.2rem;
    padding: 7px 15px;
    box-sizing: border-box;
  }
`;
const StHeaderWrapper = styled.div`
  display: flex;
  gap: 8px;
  img {
    width: 32px;
    height: 32px;
  }
  align-items: center;
  p {
    font-size: 1.2rem;
  }
`;
const StSelect = styled.select`
  width: 100%;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 1.1rem;
`;
const StTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
`;
