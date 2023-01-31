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

  cursor: pointer;
  p {
    margin: 0;
    width: 100%;
    letter-spacing: 0.3px;

    margin-top: 10px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 1.1rem;
  }
`;
const StBest5ImgWrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
