import React from 'react';
import styled from 'styled-components';

export default function Card({ plantName, image }) {
  return (
    <StCardWrapper>
      <img src={image} alt="식물 이미지" />
      <span>{plantName}</span>
    </StCardWrapper>
  );
}
const StCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 15px 0;
  img {
    aspect-ratio: 1/1;
    border-radius: 8px;
    width: 100%;
  }
  span {
    font-weight: 600;
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;
