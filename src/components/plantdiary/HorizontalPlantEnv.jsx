import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import CircleRating from './CircleRating';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';

const ratingType = {
  water: {
    title: '물 주는 양',
    color: palette.env.water_blue,
    src: waterIcon,
  },
  sunny: {
    title: '일조량',
    color: palette.env.sunshine_yellow,
    src: shineIcon,
  },
  air: {
    title: '통풍',
    color: palette.env.wind_skyblue,
    src: airIcon,
  },
};

// type = water | sunny | air
export default function HorizontalPlantEnv({
  type,
  rating,
  gap,
  editable = false,
  handler, // optional
  appendText, // optional
  afterText, // optional
}) {
  const onChangeRating = e => {
    const { value } = e.target;
    handler(value);
  };

  return (
    <StGridList>
      <StTitleWrapper>
        <img src={ratingType[type].src} alt="식물환경 아이콘" />
        <p>{ratingType[type].title}</p>
      </StTitleWrapper>
      <CircleRating
        color={ratingType[type].color}
        rating={rating}
        gap={gap}
        appendText={appendText}
        afterText={afterText}
        editable={editable}
        onChangeRating={onChangeRating}
      />
    </StGridList>
  );
}

const StGridList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 28px;
  @media (max-width: 1280px) {
    margin: 0 auto;
  }
`;
const StTitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  p {
    font-size: 1.2rem;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  img {
    width: 24px;
    height: 24px;
  }
`;
