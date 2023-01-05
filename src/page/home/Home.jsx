import React from 'react';
import styled from 'styled-components';

export default function Home() {
  return <StWrapper>Home</StWrapper>;
}

const StWrapper = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
