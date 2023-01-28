import React, { useRef } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { plantsFilterApi } from '../../apis/plantsFilter';

export default function CustomLabel(props) {
  const { dataname, button, setCategory, isClicked, setIsClicked } = props;

  const onFilterEventHandler = async e => {
    const { name } = e.target.dataset;

    setCategory(name);
    setIsClicked(true);
  };

  return (
    <StCustomLabel>
      {isClicked == false ? (
        <input
          type="radio"
          name="filter"
          onClick={onFilterEventHandler}
          data-name={dataname}
        />
      ) : (
        <input
          type="radio"
          name="filter"
          className="clicked"
          onClick={onFilterEventHandler}
          data-name={dataname}
        />
      )}
      <button type="button">{button}</button>
    </StCustomLabel>
  );
}
const StCustomLabel = styled.label`
  position: relative;
  button {
    pointer-events: none;
  }
  input {
    cursor: pointer;
    position: absolute;
    left: 0;
    opacity: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  input.clicked:checked + button {
    color: ${palette.mainColor};
    border: 1px solid ${palette.mainColor};
  }
`;
