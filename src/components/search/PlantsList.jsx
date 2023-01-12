import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import NotFound from './NotFound';

export default function PlantsList({ plantsList }) {
  return (
    <div>
      {plantsList && plantsList.length == 0 ? (
        <NotFound />
      ) : (
        <StListInner>
          {plantsList &&
            plantsList?.map(data => {
              /* console.log(data.id, data.plantName, data.image); */
              return (
                <Card
                  key={data.id}
                  plantName={data.plantName}
                  image={data.image}
                />
              );
            })}
        </StListInner>
      )}
    </div>
  );
}

const StListInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 80%;
  max-width: 1372px;
  gap: 20px;
  margin: 0 auto 80px;
  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: 90%;
  }
`;
