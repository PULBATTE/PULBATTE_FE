import styled from 'styled-components';
import React, { useEffect, useState, useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import { LeftArrow, RightArrow } from '../../components/community/Arrow';
import Tag from '../../components/community/Tag';
import { TAGS } from '../../assets/constants';
import { getBestPostApi, getPostByTagApi } from '../../apis/community';
import TagPost from '../../components/community/TagPost';
import Best5Img from '../../components/community/Best5Img';
import {
  flexAlignCenter,
  flexSpaceBetween,
  flexVerticalAlignCenter,
  ImageExpandAnimation,
} from '../../styles/mixns';
import photoFilter from '../../assets/image/photo_filter.png';

import createImg from '../../assets/image/create.png';

export default function PostList() {
  const [bestPostList, setBestPostList] = useState([]);
  const [tag, setTag] = useState('질문과 답변');
  const { ref, inView } = useInView();
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  const navigate = useNavigate();

  const getBestPostList = useCallback(async () => {
    const data = await getBestPostApi();
    setBestPostList(data.data);
  }, []);

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [tag],
    ({ pageParam = 0 }) => getPostByTagApi({ tag, pageParam }),
    {
      getNextPageParam: lastPage => {
        return !lastPage.isLast ? lastPage.nextPage : undefined;
      },
    },
  );

  const onTagHandler = e => {
    setTag(e.target.value);
  };

  useEffect(() => {
    getBestPostList();
  }, [getBestPostList]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (status.isLoading) return 'Loading...';

  if (status.error) return `An error has occurred:  + ${status.error.message}`;

  const onCreatePost = () => navigate('/createpost');
  return (
    <StWrapper>
      <StHorizontalPaddingLayout>
        <StPostListHeader>
          <h3>커뮤니티</h3>
          <span>식집사 이웃들과 다양한 이야기를 나눌 수 있는 공간 입니다</span>
        </StPostListHeader>
      </StHorizontalPaddingLayout>
      <StPostListContent>
        <StBest5Wrapper>
          <StHorizontalPaddingLayout>
            <Best5ImgHeader>
              <h3>인기 게시물 Top5 🖐</h3>
            </Best5ImgHeader>
          </StHorizontalPaddingLayout>
          <Best5ImgWrapper>
            <ScrollMenuStInjection>
              <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {bestPostList.map(v => (
                  <Best5Img key={v.id} bestPostList={v} id={v.id} />
                ))}
              </ScrollMenu>
            </ScrollMenuStInjection>
          </Best5ImgWrapper>
        </StBest5Wrapper>
        <StPostListContainer>
          <StHorizontalPaddingLayout>
            <StTagWrapper>
              <StTagContainer>
                {TAGS.map(v => (
                  <Tag
                    props={v}
                    key={`${v}_tag_key`}
                    active={tag === v} // true
                    value={v}
                    onClick={onTagHandler}
                  >
                    {v}
                  </Tag>
                ))}
              </StTagContainer>
              {!isMobile && (
                <StTagButton type="button" onClick={onCreatePost}>
                  글 작성하기
                </StTagButton>
              )}
            </StTagWrapper>
          </StHorizontalPaddingLayout>
          <StHorizontalPaddingLayout>
            <StPostWrapper>
              <StFilterdWrapper>
                {data?.pages.map(v => {
                  return (
                    <div key={v.id}>
                      {v.content.map(postData => (
                        <TagPost key={v.id} postData={postData} />
                      ))}
                    </div>
                  );
                })}
              </StFilterdWrapper>
            </StPostWrapper>
          </StHorizontalPaddingLayout>
        </StPostListContainer>
      </StPostListContent>
      {isFetchingNextPage ? (
        // TODO: animation
        <>loading</>
      ) : (
        <div className="lastChecker" ref={ref} />
      )}
      {isMobile && (
        <StFloatingAddBtn onClick={onCreatePost}>
          <img alt="Floating" src={createImg} />
        </StFloatingAddBtn>
      )}
    </StWrapper>
  );
}

const StHorizontalPaddingLayout = styled.div`
  /* @media (max-width: 1280px) {
    padding: 0px 20px;
  } */
`;
const StWrapper = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 90%;
  padding: 4rem 0 2rem;
  box-sizing: border-box;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin: 4rem auto 3rem;
    padding: unset;
    width: 100%;
  }
`;
const StPostListHeader = styled.div`
  ${flexVerticalAlignCenter}
  > h3 {
    text-align: center;
    font-size: 2.5rem;
    margin: 5rem 0 2rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin: 2rem 0 0.5rem;
    }
  }
  span {
    font-size: 1.2rem;
    @media (max-width: 500px) {
      font-size: 0.9rem;
    }
  }
  @media (max-width: 1280px) {
    padding: 0 20px;
    box-sizing: border-box;
  }
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;
const StPostListContent = styled.div`
  padding: 5vw 6vw;
  box-sizing: border-box;
  border-radius: 24px;
  box-shadow: ${palette.containerShadow1};
  margin-top: 5rem;
  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 3rem;
    box-shadow: unset;
  }
  @media (max-width: 500px) {
    margin-top: 1rem;
  }
`;
const StBest5Wrapper = styled.div``;
const StPostWrapper = styled.div``;
const StTagWrapper = styled.div`
  ${flexSpaceBetween}
  gap: 0 8px;
  flex-flow: wrap;
  padding: 20px 0px;
`;
const StTagContainer = styled.div`
  display: flex;
  gap: 0 8px;
  flex-wrap: wrap;
  @media (max-width: 500px) {
    gap: 8px;
  }
`;
const StFilterdWrapper = styled.div``;
const Best5ImgHeader = styled.div`
  ${flexSpaceBetween}
  h3 {
    font-size: 31px;
    height: 100%;
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`;
const Best5ImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: auto;
`;
const ScrollMenuStInjection = styled.div`
  width: 1280px;
  overflow: hidden;
  .react-horizontal-scrolling-menu--scroll-container {
    gap: 0 10px;
  }
  .react-horizontal-scrolling-menu--inner-wrapper {
    button {
      @media (max-width: 500px) {
        display: none;
      }
    }
  }
  .react-horizontal-scrolling-menu--inner-wrapper::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    @media (min-width: 1280px) {
      justify-content: flex-start;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
const StTagButton = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  background: ${palette.mainColor};
  border-radius: 12px;
  background: ${palette.mainColor};
  border: none;
  color: ${palette.white};
  @media (max-width: 768px) {
    display: none;
  }
`;
const StPostListContainer = styled.div`
  margin-top: 3.5rem;
  @media (max-width: 500px) {
    margin-top: 1.5rem;
  }
`;
const StFloatingAddBtn = styled.button`
  ${flexAlignCenter}
  border: none;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${palette.mainColor};
  z-index: 4;
  position: fixed;
  bottom: 40px;
  right: 20px;
  cursor: pointer;
`;
