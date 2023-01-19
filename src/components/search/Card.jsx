import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Card({ plantName, image, id }) {
  const navigate = useNavigate();
  return (
    <StCardWrapper onClick={() => navigate(`/api/plants/detail/${id}`)}>
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
