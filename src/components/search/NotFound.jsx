import React from 'react';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <StNotFound>
      <h2>검색된 내용이 데이터에 존재하지 않습니다.</h2>
      <span>다시 한번 식물 이름을 검색해주세요.</span>
    </StNotFound>
  );
}
const StNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 3rem;
    font-weight: 800;
  }
  span {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 2.4rem;
    }
    span {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 1.6rem;
    }
    span {
      font-size: 1rem;
    }
  }
`;
