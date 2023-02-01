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
    box-shadow: 0px 1px 11px 0px rgb(0 0 0 / 8%);
    border-radius: 8px;
    width: 100%;
  }
  span {
    font-size: 1.2rem;
    font-weight: 600;
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;
