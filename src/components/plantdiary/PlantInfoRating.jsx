/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Rating from 'react-rating';

export function PlantInfoRating({ title, rating, textProps }) {
  return (
    <>
      <p>{title}</p>
      <StRatingWrappper>
        {textProps.left}
        <Rating initialRating={rating} />
        {textProps.right}
      </StRatingWrappper>
    </>
  );
}

const StRatingWrappper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
