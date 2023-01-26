/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { v4 } from 'uuid';
import { getBoardList } from '../../apis/mypage';
import MyBoardList from './MyBoardList';
import { palette } from '../../styles/palette';

export default function MyPostWrapper() {
  const [boardList, setBoardList] = useState(null);
  const getBoardListApi = async () => {
    await getBoardList().then(res => setBoardList(res));
  };
  useEffect(() => {
    getBoardListApi(0);
  }, [useEffect]);

  return (
    <StMyPostWrapper>
      <div className="post_inner">
        {/* 게시글 없을 때 게시글이 없습니다도 적어줘야함 */}
        <span className="section_title">내가 쓴 게시물</span>
        <div className="boardlist_container">
          {boardList &&
            boardList.content.map(data => {
              return (
                <StBoardWrapper key={data.id}>
                  <MyBoardList
                    title={data.title}
                    content={data.content}
                    likeCnt={data.likeCnt}
                    commentCnt={data.commentCnt}
                  />
                </StBoardWrapper>
              );
            })}
        </div>
      </div>
    </StMyPostWrapper>
  );
}
const StMyPostWrapper = styled.div`
  width: 100%;
  .post_inner {
    display: flex;
    flex-direction: column;
    gap: 25px 0;
  }
  .boardlist_container {
    display: flex;
    flex-direction: column;
    gap: 16px 0;
  }
  .content_container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0 40px;
    .board_img {
      max-width: 128px;
      aspect-ratio: 1/1;
      object-fit: cover;
      height: 100%;
      border-radius: 16px;
      @media (max-width: 768px) {
        max-width: 80px;
      }
    }
  }
`;
const StBoardWrapper = styled.div`
  padding: 2rem;
  border: 1px solid ${palette.borderColor2};
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  border-radius: 16px;
  .util_container {
    display: flex;
    gap: 0 15px;
    @media (max-width: 768px) {
      font-size: 0.7rem;
      margin-top: 3px;
    }
    span {
      display: flex;
      gap: 0 5px;
      color: ${palette.textColor1};
      @media (max-width: 500px) {
        gap: 0 2px;
      }
    }
  }
`;
