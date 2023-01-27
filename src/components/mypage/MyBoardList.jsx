import React from 'react';
import styled from 'styled-components';

import { palette } from '../../styles/palette';

export default function MyBoardList({ post }) {
  const { title, content, likeCnt, image, commentCnt } = post;
  console.log(title);
  return (
    <>
      <div className="content_container">
        <StPostTextBox>
          <span className="board_title">{title}</span>
          <span className="board_content">{content}</span>
        </StPostTextBox>
        {image && <img src={image} alt="게시글 이미지" className="board_img" />}
      </div>
      <div className="util_container">
        <span>
          좋아요 <span>{likeCnt}</span>
        </span>
        <span>
          댓글<span>{commentCnt}</span>
        </span>
      </div>
    </>
  );
}

const StPostTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  @media (max-width: 768px) {
    gap: 10px 0;
  }
  .board_title {
    font-size: 1.4rem;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
  .board_content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    min-height: 60px;
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;
