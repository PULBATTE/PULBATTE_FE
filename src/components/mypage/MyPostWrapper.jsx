/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { v4 } from 'uuid';
import { getBoardList } from '../../apis/mypage';
import MyBoardList from './MyBoardList';
import { palette } from '../../styles/palette';

export default function MyPostWrapper() {
  /*  const [boardList, setBoardList] = useState(null); */
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getBoardList(pageParam),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    },
  );
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === 'loading') return console.log('loading');
  if (status === 'error') return console.log('error');
  return (
    <StMyPostWrapper>
      <div className="post_inner">
        {/* 게시글 없을 때 게시글이 없습니다도 적어줘야함 */}
        <span className="section_title">내가 쓴 게시물</span>

        {data?.pages.map((page, index) => (
          <div className="boardlist_container" key={index}>
            {page.posts.map(post => (
              <StBoardWrapper key={post.id}>
                <MyBoardList post={post} />
              </StBoardWrapper>
            ))}
          </div>
        ))}
        {isFetchingNextPage ? <div>Loading</div> : <div ref={ref} />}
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
