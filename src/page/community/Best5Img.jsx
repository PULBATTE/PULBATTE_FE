import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function Best5Img({ bestPostList }) {
  const { title, image } = bestPostList;
  return (
    <StBestContainer>
      <StBest5ImgWrapper>
        <StBest5Img alt="plantImg" src={image} />
      </StBest5ImgWrapper>
      <p>{title}</p>
    </StBestContainer>
  );
}

const StBestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
  p {
    margin: 0;
    margin-top: 8px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const StBest5ImgWrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  overflow: hidden;
  border-radius: 16px;

  ::after {
    content: 'Best';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    left: 10px;
    top: 10px;
    width: 62px;
    height: 36px;
    background-color: ${palette.white};
    z-index: 100;
    font-size: 16px;
    font-weight: bold;
    color: ${palette.mainColor};
  }
`;
const StBest5Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
`;
