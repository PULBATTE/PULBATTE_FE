/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function PlantEnviroment({ title, src, checkPoint, name }) {
  const labels = [];
  const [checkList, setCheckList] = useState([]);
  console.log(checkList);

  // 정해져서 렌더링될때 결과 값만 보이는 기능
  const onCheckEventHandler = () => {
    console.log(checkList);
    for (let i = 1; i <= 5; i += 1) {
      if (i <= checkPoint) {
        labels.push({ order: i, boolean: true, name });
      }
      if (i > checkPoint) labels.push({ order: i, boolean: false, name });
    }
    setCheckList(labels);
  };

  // 클릭해서 체크 되게 만드는 기능
  /*  const onModifyEventHandler = id => {
    console.log(checkList);
    for (let i = 1; i <= 5; i += 1) {
      if (i <= id) {
        labels.push({ order: i, boolean: true, name });
      }
      if (i > id) labels.push({ order: i, boolean: false, name });
    }
    setCheckList(labels);
  }; */

  useEffect(() => {
    onCheckEventHandler();
  }, []);

  return (
    <StGridList>
      <span>{title}</span>
      <img src={src} alt="식물환경 아이콘" />
      <div className="circle_container">
        {checkList &&
          checkList.map(data => {
            return (
              <div key={data.order}>
                <label htmlFor={`${data.order}`}>
                  <input
                    type="checkbox"
                    checked={data.boolean}
                    readOnly
                    /*  onChange={() => onModifyEventHandler(data.order)} */
                  />
                  <StSpan
                    background={data.background}
                    className={`circle circle_${data.name}`}
                    id={`${data.order}`}
                  />
                </label>
              </div>
            );
          })}
      </div>
    </StGridList>
  );
}
const StGridList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px 0;
  span {
    font-size: 14px;
    color: ${palette.textColor1};
  }
  .circle_container {
    display: flex;
    gap: 0 4px;
  }
  label {
    position: relative;
  }

  input {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
  }
  .circle {
    width: 13px;
    height: 13px;
    display: block;
    background: ${palette.borderColor1};
    border-radius: 50%;
    border: none;
  }
  input:checked + .circle_sunny {
    background: #f5bd67;
  }
  input:checked + .circle_water {
    background: #8fd2f8;
  }
  input:checked + .circle_air {
    background: #9db5da;
  }
`;

const StSpan = styled.span`
  background: ${props => props.background};
  position: relative;
  pointer-events: none;
`;
