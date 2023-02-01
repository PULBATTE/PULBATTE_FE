import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { palette } from '../../styles/palette';

export default function Best5Img({ bestPostList }) {
  const { title, image, id } = bestPostList;
  const navigate = useNavigate();
  console.log(id);
  /*  const { postId } = useParams(); */
  return (
    <StBestContainer onClick={() => navigate(`/donepost/${id}`)}>
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
  width: 200px;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;

  p {
    margin: 0;
    width: 100%;
    letter-spacing: 0.3px;

    margin-top: 10px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 1.1rem;
  }
`;
const StBest5ImgWrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 1px 11px 0px rgb(0 0 0 / 8%);

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
    border: 1px solid #e6edeb;
    background-color: ${palette.white};
    z-index: 1;
    font-size: 16px;
    font-weight: bold;
    color: ${palette.mainColor};
    @media (max-width: 500px) {
      font-size: 12px;
      width: 45px;
      height: 30px;
    }
  }
  @media (max-width: 500px) {
    width: 144px;
    height: 144px;
  }
`;
const StBest5Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
`;
