import styled from 'styled-components';

export default function Tagpost({ postData }) {
  const { title, content, profileImage, image, likeCnt, commentCnt, nickname } =
    postData;
  return (
    <StPost>
      <StPostContentWrapper>
        <StPostContent>
          <h3>{title}</h3>
          <p>{content}</p>
        </StPostContent>
        <StPostImg src={image} />
      </StPostContentWrapper>
      <StPostFooter>
        <img alt="profileImage" src={profileImage} />
        <p className="nickName">{nickname}</p>
        <p>
          좋아요 <span>{likeCnt}</span>
        </p>
        <p>
          댓글<span>{commentCnt}</span>
        </p>
      </StPostFooter>
    </StPost>
  );
}

const StPost = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid black;
`;
const StPostFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  object-fit: cover;
  @media (max-width: 768px) {
    width: 92px;
    height: 92px;
  }
`;
