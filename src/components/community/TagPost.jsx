import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';

export default function Tagpost({ postData }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    content,
    profileImage,
    image,
    likeCnt,
    commentCnt,
    nickname,
  } = postData;

  return (
    <StPost onClick={() => navigate(`/donepost/${id}`)}>
      <StPostContentWrapper>
        <StPostContent>
          <h3>{title}</h3>
          <p>{content}</p>
        </StPostContent>
        {image && <StPostImg src={image} />}
      </StPostContentWrapper>
      <StPostFooter>
        <div>
          <img alt="profileImage" src={profileImage} />
          <p className="nickName">{nickname}</p>
        </div>
        <div>
          <p>
            좋아요 <span>{likeCnt}</span>
          </p>
          <p>
            댓글<span>{commentCnt}</span>
          </p>
        </div>
      </StPostFooter>
    </StPost>
  );
}

const StPost = styled.div`
  padding: 36px 0;
  border-bottom: 1px solid ${palette.borderColor2};
  cursor: pointer;
  &:first-child {
    border-top: 1px solid ${palette.borderColor1};
  }
`;
const StPostFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 50px;
  > div {
    display: flex;
    align-items: center;
    gap: 0 5px;
  }
  p {
    font-size: 13px;
  }
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    margin-left: 4px;
  }
  .nickName {
    font-weight: bold;
  }
`;
const StPostContent = styled.div`
  width: 100%;
  margin-right: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  h3 {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 1; // 원하는 라인수
    -webkit-box-orient: vertical;
  }
  p {
    height: 85px;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 4; // 원하는 라인수
    -webkit-box-orient: vertical;
  }
`;
const StPostContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 16px;
  }
  p {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 17px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 8px;
    }
    p {
      margin-top: 8px;
      font-size: 15px;
    }
  }
`;
const StPostImg = styled.img`
  display: flex;
  flex-shrink: 0;
  width: 152px;
  height: 152px;
  border-radius: 16px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 92px;
    height: 92px;
  }
`;
